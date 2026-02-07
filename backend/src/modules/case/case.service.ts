import mongoose from "mongoose";
import CaseModel from "../../models/case.model";
import PatientModel from "../../models/patient.model";
import { CreateCaseInput } from "./case.types";

/**
 * Create a new case for a patient (ownership enforced)
 */
export const createCaseService = async (
  doctorId: string,
  input: CreateCaseInput
) => {
  const { patientId, symptoms, description } = input;

  // 1️⃣ Check: patient exists AND belongs to this doctor
  const patient = await PatientModel.findOne({
    _id: new mongoose.Types.ObjectId(patientId),
    doctorId: new mongoose.Types.ObjectId(doctorId),
  });

  if (!patient) {
    throw new Error("Patient not found or does not belong to doctor");
  }

  // 2️⃣ Create case
  const newCase = await CaseModel.create({
    doctorId: new mongoose.Types.ObjectId(doctorId),
    patientId: new mongoose.Types.ObjectId(patientId),
    symptoms,
    description,
    status: "open",
  });

  return {
    id: newCase._id.toString(),
    patientId: newCase.patientId.toString(),
    symptoms: newCase.symptoms,
    description: newCase.description,
    status: newCase.status,
    createdAt: newCase.createdAt,
  };
};

/**
 * Get all cases of logged-in doctor
 */
export const getCasesService = async (doctorId: string) => {
  const cases = await CaseModel.find({
    doctorId: new mongoose.Types.ObjectId(doctorId),
  }).sort({ createdAt: -1 });

  return cases.map((c) => ({
    id: c._id.toString(),
    patientId: c.patientId.toString(),
    symptoms: c.symptoms,
    description: c.description,
    status: c.status,
    createdAt: c.createdAt,
  }));
};

/**
 * Get single case by id (ownership enforced)
 */
export const getCaseByIdService = async (
  doctorId: string,
  caseId: string
) => {
  const foundCase = await CaseModel.findOne({
    _id: new mongoose.Types.ObjectId(caseId),
    doctorId: new mongoose.Types.ObjectId(doctorId),
  });

  if (!foundCase) {
    throw new Error("Case not found");
  }

  return {
    id: foundCase._id.toString(),
    patientId: foundCase.patientId.toString(),
    symptoms: foundCase.symptoms,
    description: foundCase.description,
    status: foundCase.status,
    createdAt: foundCase.createdAt,
  };
};
