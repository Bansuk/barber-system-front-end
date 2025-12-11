import React from 'react';
import { Input } from '@/components/ui/Input';
import { ServiceFormData } from '@/types';
import { serviceStatusOptions } from '@/lib/utils/statusConfig';
import { SimpleSelect } from '@/components/ui/SimpleSelect';

interface ServiceFormProps {
  errors: Record<string, string>;
  formData: ServiceFormData;
  mode?: 'add' | 'edit';
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  errors,
  formData,
  mode,
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

      {mode === 'edit' && (
        <SimpleSelect
          label='Status'
          name='status'
          value={formData.status}
          onChange={onChange}
          options={serviceStatusOptions}
          error={errors.status}
        />
      )}
    </>
  );
};
