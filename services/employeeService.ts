import api from '@/lib/api';
import { ApiEmployee, ApiEmployeeData, Employee, EmployeeData } from '@/types';

const transformFromApi = (data: ApiEmployee): Employee => ({
  id: data.id,
  name: data.name,
  email: data.email,
  phoneNumber: data.phone_number,
  serviceIds: data.service_ids,
});

const transformToApi = (employee: EmployeeData | Partial<Employee>): ApiEmployeeData => ({
  name: employee.name,
  email: employee.email,
  phone_number: (employee as Employee).phoneNumber,
  service_ids: (employee as Employee).serviceIds,
});

export const employeeService = {
  getAll: async (status?: string): Promise<Employee[]> => {
    const params = status ? `?status=${status}` : '';
    const data = await api.get(`/employees${params}`);
    return data.map(transformFromApi);
  },

  getById: async (id: number): Promise<Employee> => {
    const data = await api.get(`/employee/${id}`);
    return transformFromApi(data);
  },

  create: async (employee: EmployeeData): Promise<Employee> => {
    const data = await api.post('/employee', transformToApi(employee));
    return transformFromApi(data);
  },

  update: async (id: number, employee: Partial<Employee>): Promise<Employee> => {
    const data = await api.patch(`/employee/${id}`, transformToApi(employee));
    return transformFromApi(data);
  },

  delete: async (id: number): Promise<void> => api.delete(`/employee/${id}`)
};