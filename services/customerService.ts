import api from '@/lib/api';
import { Customer } from '@/types/customer';

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    return api.get('/customers');
  },

  create: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    return api.post('/customer', customer);
  },

  update: async (id: string, customer: Partial<Customer>): Promise<Customer> => {
    return api.patch(`/customers/${id}`, customer);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/customer/${id}`);
  },
};