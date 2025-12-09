import { Service, ServiceData, ServiceFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Service | null): ServiceFormData => ({
  name: initialData?.name ?? '',
  price: initialData?.price?.toString() ?? '',
});

const validateServiceForm = (formData: ServiceFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};

  if (!formData.name.trim()) newErrors.name = 'Service name is required';
  if (!formData.price.trim()) newErrors.price = 'Price is required';

  return newErrors;
};

const transformToService = (formData: ServiceFormData): ServiceData=> ({
  name: formData.name,
  price: parseInt(formData.price, 10),
});

const getEmptyFormData = (): ServiceFormData => ({
  name: '',
  price: '',
});

export const useServiceForm = (options: {
  initialData: Service | null | undefined;
}): FormHook<Service, ServiceFormData> & { toServiceData: () => ServiceData} => {
  const hook = useEntityForm<Service, ServiceFormData>({
    initialData: options.initialData,
    createInitialFormData,
    validateForm: validateServiceForm,
    transformToEntity: transformToService,
    getEmptyFormData,
  });

  return {
    ...hook,
    toServiceData: hook.toEntityData,
  };
};
