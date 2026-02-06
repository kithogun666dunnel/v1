import crypto from "crypto";
import { Doctor } from "./auth.types";
import { hashPassword, comparePassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";

const doctors: Doctor[] = []; // 🧠 in-memory DB

export const signupService = async (
  email: string,
  password: string
) => {
  const exists = doctors.find(d => d.email === email);
  if (exists) {
    throw new Error("Doctor already exists");
  }

  const hashedPassword = await hashPassword(password);

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

  const isMatch = await comparePassword(password, doctor.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({
    id: doctor.id,
    role: doctor.role,
  });

  return { token };
};
