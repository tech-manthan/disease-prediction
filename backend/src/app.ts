import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "*",
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
