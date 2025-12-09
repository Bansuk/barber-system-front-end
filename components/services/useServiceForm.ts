import { useState } from 'react';
import { Service, ServiceFormData, FormHook } from '@/types';

const createInitialFormData = (initialData?: Service | null): ServiceFormData => ({
  name: initialData?.name ?? '',
  price: initialData?.price ?? '',
});

export const useServiceForm: (options: {
  initialData: Service | null | undefined;
}) => FormHook<Service, ServiceFormData> = ({ initialData }) =>{
  const [formData, setFormData] = useState<ServiceFormData>(() =>
    createInitialFormData(initialData)
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange: FormHook<Service, ServiceFormData>['handleChange'] = (
    field,
    value
  ) => {
    if (typeof field === 'string') {
      const name = field;
      const nextValue = (value ?? '') as string;

      setFormData(prev => ({
        ...prev,
        [name]: nextValue,
      }));

      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

      return;
    }

    const event = field;
    const { name, value: eventValue } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: eventValue,
    }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ name: '', price: '' });
    setErrors({});
  };

  const clearErrors = () => {
    setErrors({});
  };

  const toServiceData = () => ({
    name: formData.name,
    price: parseInt(formData.price, 10),
  });

  const toEntityData = toServiceData;

  return {
    formData,
    loading,
    errors,
    setLoading,
    handleChange,
    validateForm,
    resetForm,
    clearErrors,
    toServiceData,
    toEntityData,
  };
};
