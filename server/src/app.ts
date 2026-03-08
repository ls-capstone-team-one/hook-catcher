import express from "express";
import cors from "cors";
import morgan from "morgan";

import binHandler from "./handlers/binHandler";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount API routes
app.use("/api/bins", binHandler);

// TODO: Mount catch-all webhook route here
// app.all("/hook/:binId/*", webhookHandler);

export default app;
