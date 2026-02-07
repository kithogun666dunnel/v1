// src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import doctorRoutes from "./modules/doctor/doctor.routes";

import { authMiddleware } from "./middlewares/auth.middleware";

import patientRoutes from "./modules/patient/patient.routes";
import caseRoutes from "./modules/case/case.routes";


const app = express();

// global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/cases", caseRoutes);


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
