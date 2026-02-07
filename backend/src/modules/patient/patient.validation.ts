import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const createPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().min(0, "Age must be >= 0"),
  gender: z.enum(["male", "female", "other"]),
  contactInfo: z
    .object({
      phone: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
});

export const validateCreatePatient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createPatientSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Invalid patient data",
      errors: error.errors,
    });
  }
};
