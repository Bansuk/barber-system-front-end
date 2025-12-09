import api from '@/lib/api';
import { ApiCustomer, ApiCustomerData, Customer, CustomerData } from '@/types';

const transformFromApi = (data: ApiCustomer): Customer => ({
  id: data.id,
  name: data.name,
  email: data.email,
  phoneNumber: data.phone_number,
});

const transformToApi = (customer: CustomerData | Partial<Customer>): ApiCustomerData => ({
  name: customer.name,
  email: customer.email,
  phone_number: (customer as Customer).phoneNumber,
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

  create: async (customer: CustomerData): Promise<Customer> => {
    const data = await api.post('/customer', transformToApi(customer));
    return transformFromApi(data);
  },

  update: async (id: number, customer: Partial<Customer>): Promise<Customer> => {
    const data = await api.patch(`/customer/${id}`, transformToApi(customer));
    return transformFromApi(data);
  },

  delete: async (id: number): Promise<void> => api.delete(`/customer/${id}`)
};