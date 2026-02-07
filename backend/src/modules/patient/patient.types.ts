export interface CreatePatientInput {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

export interface PatientResponse {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  createdAt: Date;
}
