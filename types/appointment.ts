export interface Appointment {
  id: number;
  customerId: number;
  employeeId: number;
  serviceIds: number[];
  date: string;
}

export interface ApiAppointment {
  id: number;
  customer_id: number;
  employee_id: number;
  service_ids: number[];
  date: string;
}

export type ApiAppointmentData = {
  customer_id?: number;
  employee_id?: number;
  services_ids?: number[];
  date?: string;
};

export type AppointmentData = Omit<Appointment, 'id'>;