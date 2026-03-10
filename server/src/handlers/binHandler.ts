import { Router, Request, Response } from "express";
import { createBin } from "../services/binService";

const router = Router();

/**
 * POST /api/bins - Creates a new bin.
 * Calls the bin service to generate a unique bin ID, persist it to the database,
 * and return the bin details along with its send and inspect URLs.
 * @returns 201 - The created bin with sendUrl and inspectUrl.
 * @returns 500 - If bin creation fails.
 */
router.post("/", async (_req: Request, res: Response) => {
  try {
    const binResponse = await createBin();
    res.status(201).json(binResponse);
  } catch (error) {
    console.error("Failed to create bin:", error);
    res.status(500).json({ error: "Failed to create bin" });
  }
});

export default router;
