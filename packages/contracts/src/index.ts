export type RoomMode = "live-jam" | "guided-session" | "recording";

export type RoomRole = "host" | "musician" | "listener";

export type MusicalRole =
  | "drums"
  | "guitar"
  | "bass"
  | "vocals"
  | "keys"
  | "other";

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
  roomRole: RoomRole;
  musicalRole?: MusicalRole;
};

export type Room = {
  id: string;
  mode: RoomMode;
  participants: Participant[];
  maxParticipants: 6;
};
