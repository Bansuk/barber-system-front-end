import api from '@/lib/api';
import { Customer } from '@/types';

// Transform API response (snake_case) to frontend format (camelCase)
const transformFromApi = (data: any): Customer => ({
  id: data.id,
  name: data.name,
  email: data.email,
  phoneNumber: data.phone_number,
});

// Transform frontend format (camelCase) to API format (snake_case)
const transformToApi = (customer: Omit<Customer, 'id'> | Partial<Customer>): any => ({
  name: customer.name,
  email: customer.email,
  phone_number: (customer as any).phoneNumber,
});

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const data = await api.get('/customers');
    return data.map(transformFromApi);
  },

  getById: async (id: number): Promise<Customer> => {
    const data = await api.get(`/customer/${id}`);
    return transformFromApi(data);
  },

  create: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    const data = await api.post('/customer', transformToApi(customer));
    return transformFromApi(data);
  },

  update: async (id: number, customer: Partial<Customer>): Promise<Customer> => {
    const data = await api.patch(`/customer/${id}`, transformToApi(customer));
    return transformFromApi(data);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/customer/${id}`);
  },
};