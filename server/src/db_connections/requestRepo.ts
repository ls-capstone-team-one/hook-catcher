import dbConnection from "./postgres/connection";
import mongoConnection from "./mongo_db/connection";
import { RequestDocument, RequestRecord } from "../types";


// Inserting request to Postgres DB 
export async function createRequestRecord(binId: string, mongoId: string, method: string, path: string): Promise<RequestRecord> {
  const client = await dbConnection.connect();

  const insertQuery = `INSERT INTO requests (bin_id, mongo_id, method, path) VALUES ($1, $2, $3, $4) RETURNING *;`
  const result = await client.query(insertQuery, [binId, mongoId, method, path]);

  return result.rows[0] as RequestRecord;
}

// Inserting request to MongoDB 
export async function createRequestDocument(document: RequestDocument): Promise<string> {
  const client = await mongoConnection.connect();
  const collection = client.db("hookcatcher").collection("request_payloads");

  const result = await collection.insertOne(document);

  return result.insertedId.toHexString(); 
}


