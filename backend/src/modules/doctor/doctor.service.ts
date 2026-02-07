import  Doctor  from "../../models/doctor.model";
import {
  DoctorProfileUpdateDTO,
  DoctorAvailabilityDTO,
} from "./doctor.types";

export const getDoctorById = async (doctorId: string) => {
  const doctor = await Doctor.findOne({ userId: doctorId }).select("-password");

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor;
};

export const updateDoctorProfile = async (
  doctorId: string,
  data: DoctorProfileUpdateDTO
) => {
  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { $set: data },
    { new: true }
  ).select("-password");

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor;
};

export const updateDoctorAvailability = async (
  doctorId: string,
  data: DoctorAvailabilityDTO
) => {
  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    {
      $set: {
        availability: data,
      },
    },
    { new: true }
  ).select("-password");

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor;
};
