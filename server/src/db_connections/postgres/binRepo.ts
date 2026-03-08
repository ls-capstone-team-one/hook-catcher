import nanoid from "nanoid";
import dbConnection from "./connection";

export interface Bin {
  id: string;
  created_at: Date;
  expires_at: Date;
  request_count: number;
}

const BIN_ID_LENGTH = 10;

export async function createBin(): Promise<Bin> {
  const client = await dbConnection.connect();
  const id = nanoid(BIN_ID_LENGTH);

  const queryString = `INSERT INTO bins (id) VALUES ($1) RETURNING id, created_at, expires_at, request_count`;

  const result = await client.query(queryString, [id]);

  return result.rows[0] as Bin;
}
