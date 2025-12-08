import { useState, useEffect } from 'react';
import { Service } from '@/types/service';

interface ServiceFormData {
  name: string;
  price: string;
}

interface UseServiceFormProps {
  initialData?: Service | null;
  onSuccess?: () => void;
}

export const useServiceForm = ({ initialData, onSuccess }: UseServiceFormProps = {}) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price.toString(),
      });
    } else {
      setFormData({ name: '', price: '' });
    }
  }, [initialData]);

  const handleChange = (field: keyof ServiceFormData | React.ChangeEvent<HTMLInputElement>, value?: any) => {
    // Support both direct field updates and event-based updates
    if (typeof field === 'string') {
      // Direct field update (field, value)
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } else {
      // Event-based update
      const event = field as React.ChangeEvent<HTMLInputElement>;
      const { name, value: eventValue } = event.target;
      setFormData((prev) => ({ ...prev, [name]: eventValue }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Phone number is required';
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
