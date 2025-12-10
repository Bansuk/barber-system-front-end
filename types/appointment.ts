export interface Appointment {
  id: number;
  serviceIds: number[];
}

export interface ApiAppointment {
  id: number;
  service_ids: number[];
}

export type ApiAppointmentData = {
  service_ids?: number[];
};

export type AppointmentData = Omit<Appointment, 'id'>;