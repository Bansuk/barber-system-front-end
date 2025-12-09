import { Customer, CustomerFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Customer | null): CustomerFormData => ({
  name: initialData?.name ?? '',
  email: initialData?.email ?? '',
  phone: initialData?.phoneNumber ?? '',
});

const validateCustomerForm = (formData: CustomerFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};
  const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-])+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!formData.name.trim()) newErrors.name = 'Full name is required';

  if (!formData.email.trim()) newErrors.email = 'Email address is required';
  else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

  if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

  return newErrors;
};

const transformToCustomer = (formData: CustomerFormData): Omit<Customer, 'id'> => ({
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
}): FormHook<Customer, CustomerFormData> & { toCustomerData: () => Omit<Customer, 'id'> } => {
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
