import { z } from "zod";
import { PersistedBinSchema } from "@/components/custom-ui/schema";

export const RequestDocumentSchema = z.object({
  _id: z.string(),
  method: z.string(),
  path: z.string(),
  headers: z.record(z.string(), z.unknown()),
  body: z.record(z.string(), z.unknown()),
  bin_id: z.string(),
  received_at: z.coerce.date(),
});

export const BinWithRequestsSchema = z.object({
  bin: PersistedBinSchema,
  requests: z.array(RequestDocumentSchema),
});

export type RequestDocument = z.infer<typeof RequestDocumentSchema>;
export type BinWithRequests = z.infer<typeof BinWithRequestsSchema>;
