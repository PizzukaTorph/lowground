import { useEffect, useMemo, useRef, useState } from "react";

type PeerConnectionMap = Map<string, RTCPeerConnection>;

type SignalMessage =
  | { type: "welcome"; clientId: string; peers: string[] }
  | { type: "peer-joined"; peerId: string }
  | { type: "peer-left"; peerId: string }
  | { type: "offer" | "answer" | "ice-candidate"; from: string; payload: RTCSessionDescriptionInit | RTCIceCandidateInit };

const SIGNALING_URL = import.meta.env.VITE_SIGNALING_URL ?? "ws://localhost:3001/ws";
const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
];

export default function App() {
  const roomId = useMemo(() => {
    const current = window.location.hash.replace(/^#/, "").trim();
    return current || crypto.randomUUID().slice(0, 8);
  }, []);
  const [displayName, setDisplayName] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [peerCount, setPeerCount] = useState(0);
  const [muted, setMuted] = useState(false);
  const [remotePeerIds, setRemotePeerIds] = useState<string[]>([]);
  const [peerVolumes, setPeerVolumes] = useState<Record<string, number>>({});

  const socketRef = useRef<WebSocket | null>(null);
  const clientIdRef = useRef("");
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<PeerConnectionMap>(new Map());
  const audioContainerRef = useRef<HTMLDivElement | null>(null);
  const remoteAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    return () => disconnect();
  }, []);

  function send(message: object) {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  }

  function syncPeerState() {
    const ids = [...peersRef.current.keys()];
    setRemotePeerIds(ids);
    setPeerCount(ids.length);
  }

  async function createPeerConnection(peerId: string, initiator: boolean) {
    const existing = peersRef.current.get(peerId);
    if (existing) return existing;

    const connection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    peersRef.current.set(peerId, connection);
    syncPeerState();

    for (const track of localStreamRef.current?.getTracks() ?? []) {
      connection.addTrack(track, localStreamRef.current!);
    }

    connection.onicecandidate = (event) => {
      if (event.candidate) {
        send({ type: "ice-candidate", to: peerId, payload: event.candidate.toJSON() });
      }
    };

    connection.ontrack = (event) => {
      const stream = event.streams[0];
      if (!stream || remoteAudioRef.current.has(peerId)) return;

      const audio = document.createElement("audio");
      audio.id = `remote-${peerId}`;
      audio.autoplay = true;
      audio.controls = false;
      audio.volume = peerVolumes[peerId] ?? 1;
      audio.srcObject = stream;
      remoteAudioRef.current.set(peerId, audio);
      audioContainerRef.current?.appendChild(audio);
    };

    connection.onconnectionstatechange = () => {
      if (["failed", "closed", "disconnected"].includes(connection.connectionState)) {
        removePeer(peerId);
      }
    };

    if (initiator) {
      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);
      send({ type: "offer", to: peerId, payload: offer });
    }

    return connection;
  }

  async function handleSignal(message: SignalMessage) {
    if (message.type === "welcome") {
      clientIdRef.current = message.clientId;
      for (const peerId of message.peers) {
        await createPeerConnection(peerId, true);
      }
      setStatus("Connected to room");
      return;
    }

    if (message.type === "peer-joined") {
      setStatus("Musician joined — connecting...");
      return;
    }

    if (message.type === "peer-left") {
      removePeer(message.peerId);
      return;
    }

    const peerId = message.from;
    const connection = await createPeerConnection(peerId, false);

    if (message.type === "offer") {
      await connection.setRemoteDescription(message.payload);
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      send({ type: "answer", to: peerId, payload: answer });
    } else if (message.type === "answer") {
      await connection.setRemoteDescription(message.payload);
    } else if (message.type === "ice-candidate") {
      await connection.addIceCandidate(message.payload);
    }
  }

  function removePeer(peerId: string) {
    peersRef.current.get(peerId)?.close();
    peersRef.current.delete(peerId);
    remoteAudioRef.current.get(peerId)?.remove();
    remoteAudioRef.current.delete(peerId);
    setPeerVolumes((current) => {
      const next = { ...current };
      delete next[peerId];
      return next;
    });
    syncPeerState();
  }

  async function connect() {
    if (connected) return;

    try {
      setStatus("Requesting microphone...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      });
      localStreamRef.current = stream;

      const socketUrl = `${SIGNALING_URL}?room=${encodeURIComponent(roomId)}`;
      const socket = new WebSocket(socketUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        setConnected(true);
        setStatus("Waiting for musicians...");
      };
      socket.onmessage = (event) => {
        void handleSignal(JSON.parse(event.data) as SignalMessage);
      };
      socket.onerror = () => setStatus("Signaling connection failed");
      socket.onclose = () => {
        setConnected(false);
        setStatus("Disconnected");
      };
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not access audio device");
    }
  }

  function disconnect() {
    socketRef.current?.close();
    socketRef.current = null;
    for (const peerId of [...peersRef.current.keys()]) removePeer(peerId);
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    setMuted(false);
    setConnected(false);
    setStatus("Ready");
  }

  function toggleMute() {
    const next = !muted;
    for (const track of localStreamRef.current?.getAudioTracks() ?? []) track.enabled = !next;
    setMuted(next);
  }

  function setPeerVolume(peerId: string, volume: number) {
    const audio = remoteAudioRef.current.get(peerId);
    if (audio) audio.volume = volume;
    setPeerVolumes((current) => ({ ...current, [peerId]: volume }));
  }

  function togglePeerMute(peerId: string) {
    const current = peerVolumes[peerId] ?? 1;
    setPeerVolume(peerId, current > 0 ? 0 : 1);
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">LOWGROUND PLAYGROUND</p>
        <h1>Can we actually play together?</h1>
        <p className="lede">
          A tiny browser-first experiment for geographically compatible musicians.
        </p>
      </section>

      <section className="panel">
        <label>
          Your name
          <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Pizzu" />
        </label>
        <div className="room-row">
          <span>Room</span>
          <code>{roomId}</code>
          <button onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy invite</button>
        </div>
        <div className="actions">
          {!connected ? <button className="primary" onClick={() => void connect()}>Enter room</button> : <button onClick={disconnect}>Leave</button>}
          {connected && <button onClick={toggleMute}>{muted ? "Unmute" : "Mute me"}</button>}
        </div>
        <p className="status"><span className={connected ? "dot live" : "dot"} />{status} · {peerCount} remote peer{peerCount === 1 ? "" : "s"}</p>
      </section>

      <section className="panel mixer">
        <h2>Personal mix</h2>
        <p>These controls affect only what you hear. They do not change anyone else's mix.</p>
        {remotePeerIds.length === 0 ? (
          <p className="muted">Remote musicians will appear here when they connect.</p>
        ) : (
          <div className="mixer-list">
            {remotePeerIds.map((peerId) => {
              const volume = peerVolumes[peerId] ?? 1;
              return (
                <div className="mixer-row" key={peerId}>
                  <span className="peer-label">Peer {peerId.slice(0, 6)}</span>
                  <input
                    aria-label={`Volume for peer ${peerId.slice(0, 6)}`}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(event) => setPeerVolume(peerId, Number(event.target.value))}
                  />
                  <output>{Math.round(volume * 100)}%</output>
                  <button onClick={() => togglePeerMute(peerId)}>{volume === 0 ? "Unmute" : "Mute"}</button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="panel notes">
        <h2>Test setup</h2>
        <p>Use wired headphones and an audio interface where possible. Bluetooth is intentionally not part of this latency test.</p>
        <div ref={audioContainerRef} aria-hidden="true" />
      </section>
    </main>
  );
}
