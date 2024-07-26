interface Status {
  state: string;
  pctComplete: string;
  errorReasonCode: string;
  errorReasonText: string;
}

interface Meta {
  name: string;
}

interface Input {
  width: number;
  height: number;
}

interface Playback {
  hls: string;
  dash: string;
}

interface PublicDetails {
  title: string | null;
  share_link: string | null;
  channel_link: string | null;
  logo: string | null;
}

export interface Video {
  uid: string;
  creator: string | null;
  thumbnail: string;
  thumbnailTimestampPct: number;
  readyToStream: boolean;
  readyToStreamAt: string;
  status: Status;
  meta: Meta;
  created: string;
  modified: string;
  scheduledDeletion: string | null;
  size: number;
  preview: string;
  allowedOrigins: string[];
  requireSignedURLs: boolean;
  uploaded: string;
  uploadExpiry: string | null;
  maxSizeBytes: number | null;
  maxDurationSeconds: number | null;
  duration: number;
  input: Input;
  playback: Playback;
  watermark: string | null;
  liveInput: string;
  clippedFrom: string | null;
  publicDetails: PublicDetails;
}
