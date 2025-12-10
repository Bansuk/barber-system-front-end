import api from '@/lib/api';
import { ApiAppointment, ApiAppointmentData, Appointment, AppointmentData } from '@/types';

const transformFromApi = (data: ApiAppointment): Appointment => ({
  id: data.id,
  customerId: data.customer_id,
  employeeId: data.employee_id,
  serviceIds: data.service_ids,
  date: data.date,
});

const transformToApi = (appointment: AppointmentData | Partial<Appointment>): ApiAppointmentData => ({
  customer_id: 'customerId' in appointment ? appointment.customerId : undefined,
  employee_id: 'employeeId' in appointment ? appointment.employeeId : undefined,
  service_ids: 'serviceIds' in appointment ? appointment.serviceIds : undefined,
  date: 'date' in appointment ? appointment.date : undefined,
});

export const appointmentService = {
  getAll: async (): Promise<Appointment[]> => {
    const data = await api.get('/appointments');
    return data.map(transformFromApi);
  },

  getById: async (id: number): Promise<Appointment> => {
    const data = await api.get(`/appointment/${id}`);
    return transformFromApi(data);
  },

  create: async (appointment: AppointmentData): Promise<Appointment> => {
    const data = await api.post('/appointment', transformToApi(appointment));
    return transformFromApi(data);
  },

  update: async (id: number, appointment: Partial<Appointment>): Promise<Appointment> => {
    const data = await api.patch(`/appointment/${id}`, transformToApi(appointment));
    return transformFromApi(data);
  },

  delete: async (id: number): Promise<void> => api.delete(`/appointment/${id}`)
};