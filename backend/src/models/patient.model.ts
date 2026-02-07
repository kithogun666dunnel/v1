import mongoose, { Schema, Document } from "mongoose";

export interface PatientDocument extends Document {
  doctorId: mongoose.Types.ObjectId;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  createdAt: Date;
}

const PatientSchema = new Schema<PatientDocument>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true, // ownership queries fast hongi
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    contactInfo: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const PatientModel = mongoose.model<PatientDocument>(
  "Patient",
  PatientSchema
);

export default PatientModel;
