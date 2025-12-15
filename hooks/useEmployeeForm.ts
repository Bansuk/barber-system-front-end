import { Employee, EmployeeData, EmployeeFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Employee | null): EmployeeFormData => ({
  name: initialData?.name ?? '',
  email: initialData?.email ?? '',
  phone: initialData?.phoneNumber ?? '',
  status: initialData?.status ?? 'available',
  serviceIds: initialData?.serviceIds ?? [],
});

const validateEmployeeForm = (formData: EmployeeFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};
  const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-])+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!formData.name.trim()) newErrors.name = 'Nome completo é obrigatório';
  if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
  else if (!emailRegex.test(formData.email)) newErrors.email = 'Digite um endereço de e-mail válido';
  if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
  else if (formData.phone.length !== 11) newErrors.phone = 'Telefone deve ter 11 dígitos (DDD + 9 dígitos)';
  if (!formData.serviceIds || formData.serviceIds.length === 0) newErrors.serviceIds = 'Pelo menos um serviço deve ser selecionado';

  return newErrors;
};

const transformToEmployee = (formData: EmployeeFormData): EmployeeData => ({
  name: formData.name,
  email: formData.email,
  phoneNumber: formData.phone,
  status: formData.status,
  serviceIds: formData.serviceIds,
});

const getEmptyFormData = (): EmployeeFormData => ({
  name: '',
  email: '',
  phone: '',
  status: 'available',
  serviceIds: [],
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
