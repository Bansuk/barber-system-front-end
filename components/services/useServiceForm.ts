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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
    price: formData.price,
  });

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
  };
};
