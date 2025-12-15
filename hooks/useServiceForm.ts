import { Service, ServiceData, ServiceFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Service | null): ServiceFormData => ({
  name: initialData?.name ?? '',
  price: initialData?.price?.toString() ?? '',
  status: initialData?.status ?? 'available',
});

const validateServiceForm = (formData: ServiceFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};

  if (!formData.name.trim()) newErrors.name = 'Nome do serviço é obrigatório';
  if (!formData.price.trim()) newErrors.price = 'Preço é obrigatório';

  return newErrors;
};

const transformToService = (formData: ServiceFormData): ServiceData=> ({
  name: formData.name,
  price: parseInt(formData.price, 10),
  status: formData.status,
});

const getEmptyFormData = (): ServiceFormData => ({
  name: '',
  price: '',
  status: 'available',
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
