import api from '@/lib/api';
import  { Service }  from '@/types/service';

export const serviceService = {
  getAll: async (): Promise<Service[]> => api.get('/services'),
  getById: async (id: number): Promise<Service> => api.get(`/service/${id}`),
  create: async (service: Omit<Service, 'id'>): Promise<Service> => api.post('/service', service),
  update: async (id: number, service: Partial<Service>): Promise<Service> => api.patch(`/service/${id}`, service),
  delete: async (id: number): Promise<void> => api.delete(`/service/${id}`)
}