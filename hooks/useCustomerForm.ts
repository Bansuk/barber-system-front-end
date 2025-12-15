import { Customer, CustomerData, CustomerFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Customer | null): CustomerFormData => ({
  name: initialData?.name ?? '',
  email: initialData?.email ?? '',
  phone: initialData?.phoneNumber ?? '',
});

const validateCustomerForm = (formData: CustomerFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};
  const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-])+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!formData.name.trim()) newErrors.name = 'Nome completo é obrigatório';
  if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
  else if (!emailRegex.test(formData.email)) newErrors.email = 'Digite um endereço de e-mail válido';
  if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';

  return newErrors;
};

const transformToCustomer = (formData: CustomerFormData): CustomerData => ({
  name: formData.name,
  email: formData.email,
  phoneNumber: formData.phone,
});

const getEmptyFormData = (): CustomerFormData => ({
  name: '',
  email: '',
  phone: '',
});

export const useCustomerForm = (options: {
  initialData: Customer | null | undefined;
}): FormHook<Customer, CustomerFormData> & { toCustomerData: () => CustomerData } => {
  const hook = useEntityForm<Customer, CustomerFormData>({
    initialData: options.initialData,
    createInitialFormData,
    validateForm: validateCustomerForm,
    transformToEntity: transformToCustomer,
    getEmptyFormData,
  });

  return {
    ...hook,
    toCustomerData: hook.toEntityData,
  };
};
