import { ReactNode } from 'react';

export interface ApiError {
  errors?: {
    json?: Record<string, string[]>;
  };
  message?: string;
}

export interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
}

export interface FormHook<T, D> {
  formData: D;
  loading: boolean;
  errors: Record<string, string>;
  setLoading: (loading: boolean) => void;
  handleChange: (field: keyof D | React.ChangeEvent<HTMLInputElement>, value?: unknown) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  clearErrors: () => void;
  toEntityData: () => Omit<T, 'id'>;
}

export interface AppointmentFormData {
  customerId: number | '';
  date: string;
  employeeId: number | '';
  serviceIds: number[];
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  serviceIds: number[];
}

export interface ServiceFormData {
  name: string;
  price: string;
}

export type SaveResult = { success: boolean; error?: string };
