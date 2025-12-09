import { useState } from 'react';
import { Customer, CustomerFormData, FormHook } from '@/types';

const createInitialFormData = (initialData?: Customer | null): CustomerFormData => ({
  name: initialData?.name ?? '',
  email: initialData?.email ?? '',
  phone: initialData?.phoneNumber ?? '',
});

export const useCustomerForm: (options: {
  initialData: Customer | null | undefined;
}) => FormHook<Customer, CustomerFormData> = ({ initialData }) =>{
  const [formData, setFormData] = useState<CustomerFormData>(() =>
    createInitialFormData(initialData)
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange: FormHook<Customer, CustomerFormData>['handleChange'] = (
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
    const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-])+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    if (!formData.name.trim()) newErrors.name = 'Full name is required';

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

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
