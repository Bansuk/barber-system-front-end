import React from 'react';
import { Input } from '@/components/ui/Input';
import { ServiceFormData } from '@/types';

interface ServiceFormProps {
  errors: Record<string, string>;
  formData: ServiceFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  errors,
  formData,
  onChange,
}) => {
  return (
    <>
      <Input
        label='Nome'
        name='name'
        type='text'
        placeholder='Digite o nome do serviço'
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        minLength={3}
        maxLength={100}
      />

      <Input
        label='Preço'
        name='price'
        type='price'
        placeholder='R$ 0,00'
        value={formData.price}
        onChange={onChange}
        required
        error={errors.price}
      />

    </>
  );
};
