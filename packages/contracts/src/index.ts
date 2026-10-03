export type RoomMode = "live-jam" | "guided-session" | "recording";

export type DiagnosticSample = {
  timestamp: number;
  roundTripTimeMs?: number;
  jitterMs?: number;
  packetsLost?: number;
  packetsReceived?: number;
  connectionState: RTCPeerConnectionState;
};

export type Participant = {
  id: string;
  displayName: string;
  instrument?: string;
};

export type Room = {
  id: string;
  mode: RoomMode;
  participants: Participant[];
  maxParticipants: 6;
};
