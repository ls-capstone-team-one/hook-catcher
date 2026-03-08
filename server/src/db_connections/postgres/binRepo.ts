import dbConnection from "./connection";
import { Bin } from "../../types";

export async function createBin(id: string): Promise<Bin> {
  const client = await dbConnection.connect();

  const queryString = `INSERT INTO bins (id) VALUES ($1) RETURNING id, created_at, expires_at, request_count`;

  const result = await client.query(queryString, [id]);

  return result.rows[0] as Bin;
}
