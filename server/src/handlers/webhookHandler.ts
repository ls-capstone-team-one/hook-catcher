import { Router, Request, Response } from "express";
import { captureRequest } from "../services/webhookService";

const router = Router();


router.all("/:binId", async (req: Request, res: Response) => {
  try {
    const binId  = req.params.binId as string;
    const method = req.method;
    const path = req.path;
    const headers = req.headers;
    const body = req.body;  

    await captureRequest(binId, method, path, headers, body);

    res.status(200).json({ message: "Request captured" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Bin not found") {
        res.status(404).json({ error: "Bin not found" });
        return;
      }
      if (error.message === "Bin has expired") {
        res.status(410).json({ error: "Bin has expired" });
        return;
      }
    }

    console.error("Failed to capture request:", error);
    res.status(500).json({ error: "Failed to capture request" });
  }
});

export default router;




