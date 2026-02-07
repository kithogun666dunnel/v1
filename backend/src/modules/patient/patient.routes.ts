import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createPatientController,
  getPatientsController,
  getPatientByIdController,
} from "./patient.controller";
import { validateCreatePatient } from "./patient.validation";

const router = Router();

/**
 * All patient routes are protected
 * Doctor must be logged in
 */
router.use(authMiddleware);

/**
 * POST /patients
 * Create patient
 */
router.post("/", validateCreatePatient, createPatientController);

/**
 * GET /patients
 * Get all patients of logged-in doctor
 */
router.get("/", getPatientsController);

/**
 * GET /patients/:id
 * Get single patient by id
 */
router.get("/:id", getPatientByIdController);

export default router;
