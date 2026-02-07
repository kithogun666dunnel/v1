import { Request, Response, NextFunction } from "express";
import {
  getDoctorById,
  updateDoctorProfile,
  updateDoctorAvailability,
} from "./doctor.service";
import {
  updateDoctorProfileSchema,
  updateDoctorAvailabilitySchema,
} from "./doctor.validation";

export const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id;

    const doctor = await getDoctorById(doctorId);

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id;

    const validatedData = updateDoctorProfileSchema.parse(req.body);

    const doctor = await updateDoctorProfile(doctorId, validatedData);

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMyAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctorId = req.user!.id;

    const validatedData = updateDoctorAvailabilitySchema.parse(req.body);

    const doctor = await updateDoctorAvailability(doctorId, validatedData);

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};
