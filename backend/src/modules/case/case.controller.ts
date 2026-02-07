import { Request, Response, NextFunction } from "express";
import {
  createCaseService,
  getCasesService,
  getCaseByIdService,
} from "./case.service";

/**
 * POST /cases
 * Create a new case for a patient
 */
export const createCaseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id; // auth middleware se
    const newCase = await createCaseService(doctorId, req.body);

    res.status(201).json({
      success: true,
      data: newCase,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /cases
 * Get all cases of logged-in doctor
 */
export const getCasesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id;
    const cases = await getCasesService(doctorId);

    res.status(200).json({
      success: true,
      data: cases,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /cases/:id
 * Get single case (ownership enforced)
 */
export const getCaseByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id;
    const { id: caseId } = req.params;

    const foundCase = await getCaseByIdService(doctorId, caseId);

    res.status(200).json({
      success: true,
      data: foundCase,
    });
  } catch (error) {
    next(error);
  }
};
