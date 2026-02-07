import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const createCaseSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  symptoms: z
    .array(z.string().min(1))
    .min(1, "At least one symptom is required"),
  description: z.string().min(1, "Description is required"),
});

export const validateCreateCase = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createCaseSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Invalid case data",
      errors: error.errors,
    });
  }
};
