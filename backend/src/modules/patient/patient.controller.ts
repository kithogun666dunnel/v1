import { Request, Response, NextFunction } from "express";
import {
  createPatientService,
  getPatientsService,
  getPatientByIdService,
} from "./patient.service";

/**
 * POST /patients
 * Create patient
 */
export const createPatientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id; // auth middleware se aata hai
    const patient = await createPatientService(doctorId, req.body);

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /patients
 * List all patients of logged-in doctor
 */
export const getPatientsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id;
    const patients = await getPatientsService(doctorId);

    res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /patients/:id
 * Get single patient (ownership enforced)
 */
export const getPatientByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id;
    const { id: patientId } = req.params;

    const patient = await getPatientByIdService(doctorId, patientId);

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};
