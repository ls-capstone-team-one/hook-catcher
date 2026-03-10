import { nanoid } from "nanoid";
import { createBin as repoCreateBin } from "../db_connections/binRepo";
import { Bin, BinResponse } from "../types";

const BIN_ID_LENGTH = 10;

export async function createBin(): Promise<BinResponse> {
  const id = nanoid(BIN_ID_LENGTH);
  const bin: Bin = await repoCreateBin(id);

  const inspectUrl = `/web/bins/${bin.id}`;
  const sendUrl = `/${bin.id}`;

  return {
    bin,
    sendUrl,
    inspectUrl,
  };
}
