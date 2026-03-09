export interface Bin {
  id: string;
  created_at: Date;
  expires_at: Date;
  request_count: number;
}

export interface BinResponse {
  bin: Bin;
  sendUrl: string;
  inspectUrl: string;
}
