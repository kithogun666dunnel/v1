import bcrypt from "bcrypt";
import { Doctor } from "./auth.types";
import { signToken } from "../../utils/jwt";

const doctors: Doctor[] = []; // 🔥 TEMP DB

export const signupService = async (
  email: string,
  password: string
) => {
  const existing = doctors.find(d => d.email === email);
  if (existing) {
    throw new Error("Doctor already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const doctor: Doctor = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    role: "doctor",
  };

  doctors.push(doctor);

  const token = signToken({
    id: doctor.id,
    role: doctor.role,
  });

  return { token };
};

export const loginService = async (
  email: string,
  password: string
) => {
  const doctor = doctors.find(d => d.email === email);
  if (!doctor) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, doctor.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({
    id: doctor.id,
    role: doctor.role,
  });

  return { token };
};
