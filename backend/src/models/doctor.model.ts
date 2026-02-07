import mongoose, { Schema, Document } from "mongoose";

export interface DoctorDocument extends Document {
  userId: string; // 👈 ADD THIS

  email: string;
  password: string;
  role: "doctor";

  name?: string;
  specialization?: string;

  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };

  createdAt: Date;
}


const doctorSchema = new Schema<DoctorDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    userId: {
  type: String,
  required: true,
  unique: true,
},

    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor",
    },

    name: {
      type: String,
    },
    specialization: {
      type: String,
    },

    availability: {
      days: {
        type: [String],
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model<DoctorDocument>("Doctor", doctorSchema);

export default Doctor;
