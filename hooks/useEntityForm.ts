import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { FormHook } from '@/types';

export interface UseEntityFormOptions<T, D> {
  createInitialFormData: (initialData?: T | null) => D;
  getEmptyFormData: () => D;
  initialData: T | null | undefined;
  transformToEntity: (formData: D) => Omit<T, 'id'>;
  validateForm: (formData: D) => Record<string, string>;
}

function isInputChangeEvent(
  value: unknown
): value is ChangeEvent<HTMLInputElement | HTMLSelectElement> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'target' in value &&
    typeof (value as { target: unknown }).target === 'object'
  );
}

export function useEntityForm<T, D extends object>({
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

  const handleChangeImpl = (field: unknown, value?: unknown): void => {
  if (isInputChangeEvent(field)) {
    const event = field;
    const { name, value: eventValue } = event.target;
    const key = name as keyof D;

    setFormData(prev => ({
      ...prev,
      [key]: eventValue as D[typeof key],
    }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    return;
  }

  if (
    typeof field === 'string' ||
    typeof field === 'number' ||
    typeof field === 'symbol'
  ) {
    const key = field as keyof D;
    const name = String(field);
    const nextValue = value as D[typeof key];

    setFormData(prev => ({
      ...prev,
      [key]: nextValue,
    }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

    return;
  }
};

  const handleChange = handleChangeImpl as FormHook<T, D>['handleChange'];

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
