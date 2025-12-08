import api from '@/lib/api';
import { Customer } from '@/types';

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    return api.get('/customers');
  },

  getById: async (id: number): Promise<Customer> => {
    return api.get(`/customer/${id}`);
  },

  create: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    return api.post('/customer', customer);
  },

  update: async (id: number, customer: Partial<Customer>): Promise<Customer> => {
    return api.patch(`/customer/${id}`, customer);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/customer/${id}`);
  },
};