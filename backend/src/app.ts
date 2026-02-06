// src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";

import { authMiddleware } from "./middlewares/auth.middleware";



const app = express();

// global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes);

// health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

//PROTECTED ROUTE
app.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default app;
