import { useState, useEffect } from 'react';
import { Customer, CustomerFormData } from '@/types';

interface UseCustomerFormProps {
  initialData?: Customer | null;
  onSuccess?: () => void;
}

export const useCustomerForm = ({ initialData, onSuccess }: UseCustomerFormProps = {}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phoneNumber,
      });
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [initialData]);

  const handleChange = (field: keyof CustomerFormData | React.ChangeEvent<HTMLInputElement>, value?: any) => {
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
    const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-])+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
  };

  const clearErrors = () => {
    setErrors({});
  };

  const toCustomerData = () => ({
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phone,
  });

  const toEntityData = toCustomerData;

  return {
    formData,
    loading,
    errors,
    setLoading,
    handleChange,
    validateForm,
    resetForm,
    clearErrors,
    toCustomerData,
    toEntityData,
  };
};
