import {
  createBin as repoCreateBin,
  Bin,
} from "../db_connections/postgres/binRepo";

export interface BinResponse {
  bin: Bin;
  sendUrl: string;
  inspectUrl: string;
}

export async function createBin(): Promise<BinResponse> {
  const bin = await repoCreateBin();

  const inspectUrl = `/api/bins/${bin.id}`;
  const sendUrl = `/${bin.id}`;

  return {
    bin,
    sendUrl,
    inspectUrl,
  };
}
