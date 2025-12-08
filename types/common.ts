import { ReactNode } from 'react';

// API Related Types
export interface ApiError {
  errors?: {
    json?: Record<string, string[]>;
  };
  message?: string;
}

// Table/DataTable Types
export interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
}

// CRUD Service Types
export interface CrudService<T> {
  create: (data: Omit<T, 'id'>) => Promise<T>;
  update: (id: number, data: Partial<T>) => Promise<T>;
  delete: (id: number) => Promise<void>;
}

export interface CrudActionsConfig {
  entityName: string;
  revalidatePaths: string[];
}

export interface CrudActions<T> {
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

// Form Hook Types
export interface FormHook<T, D> {
  formData: D;
  loading: boolean;
  errors: Record<string, string>;
  setLoading: (loading: boolean) => void;
  handleChange: (field: keyof D | React.ChangeEvent<HTMLInputElement>, value?: any) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  clearErrors: () => void;
  toEntityData: () => Omit<T, 'id'>;
}

// Form Data Types
export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

export interface ServiceFormData {
  name: string;
  price: string;
}
