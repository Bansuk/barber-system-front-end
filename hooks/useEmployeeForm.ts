import { Employee, EmployeeData, EmployeeFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Employee | null): EmployeeFormData => ({
  name: initialData?.name ?? '',
  email: initialData?.email ?? '',
  phone: initialData?.phoneNumber ?? '',
});

const validateEmployeeForm = (formData: EmployeeFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};
  const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-])+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!formData.name.trim()) newErrors.name = 'Full name is required';
  if (!formData.email.trim()) newErrors.email = 'Email address is required';
  else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
  if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

  return newErrors;
};

const transformToEmployee = (formData: EmployeeFormData): EmployeeData => ({
  name: formData.name,
  email: formData.email,
  phoneNumber: formData.phone,
});

const getEmptyFormData = (): EmployeeFormData => ({
  name: '',
  email: '',
  phone: '',
});

export const useEmployeeForm = (options: {
  initialData: Employee | null | undefined;
}): FormHook<Employee, EmployeeFormData> & { toEmployeeData: () => EmployeeData } => {
  const hook = useEntityForm<Employee, EmployeeFormData>({
    initialData: options.initialData,
    createInitialFormData,
    validateForm: validateEmployeeForm,
    transformToEntity: transformToEmployee,
    getEmptyFormData,
  });

  return {
    ...hook,
    toEmployeeData: hook.toEntityData,
  };
};
