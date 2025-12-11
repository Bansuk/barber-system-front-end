import React from 'react';
import { EmployeeFormData, Service } from '@/types';
import { Input } from '@/components/ui/Input';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { SimpleSelect } from '@/components/ui/SimpleSelect';

interface EmployeeFormProps {
  errors: Record<string, string>;
  formData: EmployeeFormData;
  mode?: 'add' | 'edit';
  onChange: (field: keyof EmployeeFormData | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, value?: unknown) => void;
  onServiceChange: (serviceIds: number[]) => void;
  services: Service[];
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  errors,
  formData,
  mode,
  onChange,
  onServiceChange,
  services,
}) => {
  return (
    <>
      <Input
        label='Nome Completo'
        name='name'
        type='text'
        placeholder='Digite o nome do funcionário(a)'
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        minLength={3}
        maxLength={100}
      />

      <Input
        label='Email'
        name='email'
        type='email'
        placeholder='Digite o email do funcionário(a)'
        value={formData.email}
        onChange={onChange}
        required
        error={errors.email}
      />

      <Input
        label='Telefone'
        name='phone'
        type='tel'
        placeholder='(99) 99999-9999'
        value={formData.phone}
        onChange={onChange}
        required
        error={errors.phone}
      />

      {mode === 'edit' && (
        <SimpleSelect
          label='Status'
          name='status'
          value={formData.status}
          onChange={onChange}
          options={[
            { value: 'available', label: 'Active' },
            { value: 'vacation', label: 'Vacation' },
            { value: 'sick_leave', label: 'Sick Leave' },
            { value: 'unavailable', label: 'Inactive' },
          ]}
          error={errors.status}
        />
      )}

      <MultiSelect
        label='Serviços'
        name='serviceIds'
        options={services}
        selectedIds={formData.serviceIds}
        onChange={onServiceChange}
        required
        error={errors.serviceIds}
      />
    </>
  );
};
