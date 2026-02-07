import { z } from "zod";

export const updateDoctorProfileSchema = z.object({
  name: z.string().min(2).optional(),
  specialization: z.string().min(2).optional(),
});

export const updateDoctorAvailabilitySchema = z.object({
  days: z.array(z.string()).min(1),
  startTime: z.string(), // "09:00"
  endTime: z.string(),   // "17:00"
});
