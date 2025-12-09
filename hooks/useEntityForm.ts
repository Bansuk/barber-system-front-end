import { useState } from 'react';
import { FormHook } from '@/types';

export interface UseEntityFormOptions<T, D> {
  initialData: T | null | undefined;
  createInitialFormData: (initialData?: T | null) => D;
  validateForm: (formData: D) => Record<string, string>;
  transformToEntity: (formData: D) => Omit<T, 'id'>;
  getEmptyFormData: () => D;
}

export function useEntityForm<T, D extends Record<string, any>>({
  initialData,
  createInitialFormData,
  validateForm: validate,
  transformToEntity,
  getEmptyFormData,
}: UseEntityFormOptions<T, D>): FormHook<T, D> {
  const [formData, setFormData] = useState<D>(() =>
    createInitialFormData(initialData)
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange: FormHook<T, D>['handleChange'] = (field, value) => {
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

  const validateFormData = (): boolean => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(getEmptyFormData());
    setErrors({});
  };

  const clearErrors = () => {
    setErrors({});
  };

  const toEntityData = () => transformToEntity(formData);

  return {
    formData,
    loading,
    errors,
    setLoading,
    handleChange,
    validateForm: validateFormData,
    resetForm,
    clearErrors,
    toEntityData,
  };
}
