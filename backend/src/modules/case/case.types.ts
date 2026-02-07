export interface CreateCaseInput {
  patientId: string;
  symptoms: string[];
  description: string;
}

export interface CaseResponse {
  id: string;
  patientId: string;
  symptoms: string[];
  description: string;
  status: "open";
  createdAt: Date;
}
