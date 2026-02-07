import PatientModel from "../../models/patient.model";
import { CreatePatientInput } from "./patient.types";
import mongoose from "mongoose";

/**
 * Create a new patient for a doctor
 */
export const createPatientService = async (
  doctorId: string,
  input: CreatePatientInput
) => {
  const patient = await PatientModel.create({
    doctorId: new mongoose.Types.ObjectId(doctorId),
    ...input,
  });

  return {
    id: patient._id.toString(),
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    contactInfo: patient.contactInfo,
    createdAt: patient.createdAt,
  };
};

/**
 * Get all patients of a doctor
 */
export const getPatientsService = async (doctorId: string) => {
  const patients = await PatientModel.find({
    doctorId: new mongoose.Types.ObjectId(doctorId),
  }).sort({ createdAt: -1 });

  return patients.map((patient) => ({
    id: patient._id.toString(),
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    contactInfo: patient.contactInfo,
    createdAt: patient.createdAt,
  }));
};

/**
 * Get a single patient by id (ownership enforced)
 */
export const getPatientByIdService = async (
  doctorId: string,
  patientId: string
) => {
  const patient = await PatientModel.findOne({
    _id: new mongoose.Types.ObjectId(patientId),
    doctorId: new mongoose.Types.ObjectId(doctorId),
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  return {
    id: patient._id.toString(),
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    contactInfo: patient.contactInfo,
    createdAt: patient.createdAt,
  };
};
