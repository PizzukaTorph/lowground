import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { WebSocket } from "ws";

type SignalMessage = {
  type: "offer" | "answer" | "ice-candidate";
  from?: string;
  to: string;
  payload: unknown;
};

type Client = {
  id: string;
  socket: WebSocket;
};

const app = Fastify({ logger: true });
const rooms = new Map<string, Map<string, Client>>();

await app.register(websocket);

app.get("/health", async () => ({ ok: true, service: "lowground-signaling" }));

app.get("/ws", { websocket: true }, (socket, request) => {
  const roomId = (request.query as { room?: string }).room?.trim();

  if (!roomId) {
    socket.close(1008, "room is required");
    return;
  }

  const client: Client = {
    id: crypto.randomUUID(),
    socket,
  };

  const room = rooms.get(roomId) ?? new Map<string, Client>();
  const existingPeerIds = [...room.keys()];
  room.set(client.id, client);
  rooms.set(roomId, room);

  socket.send(JSON.stringify({
    type: "welcome",
    clientId: client.id,
    peers: existingPeerIds,
  }));

  const broadcast = (message: object, except?: string) => {
    for (const peer of room.values()) {
      if (peer.id !== except && peer.socket.readyState === WebSocket.OPEN) {
        peer.socket.send(JSON.stringify(message));
      }
    }
  };

  broadcast({ type: "peer-joined", peerId: client.id }, client.id);

  socket.on("message", (raw) => {
    let message: SignalMessage;

    try {
      message = JSON.parse(raw.toString()) as SignalMessage;
    } catch {
      return;
    }

    const target = room.get(message.to);
    if (!target || !["offer", "answer", "ice-candidate"].includes(message.type)) {
      return;
    }

    target.socket.send(JSON.stringify({ ...message, from: client.id }));
  });

  socket.on("close", () => {
    room.delete(client.id);
    broadcast({ type: "peer-left", peerId: client.id });
    if (room.size === 0) rooms.delete(roomId);
  });
});

const port = Number(process.env.PORT ?? 3001);
await app.listen({ host: "0.0.0.0", port });
