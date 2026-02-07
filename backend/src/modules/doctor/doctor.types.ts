export interface DoctorProfileUpdateDTO {
  name?: string;
  specialization?: string;
}

export interface DoctorAvailabilityDTO {
  days: string[];      // ["mon", "tue"]
  startTime: string;   // "09:00"
  endTime: string;     // "17:00"
}
