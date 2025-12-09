import React from 'react';
import { EmployeeFormData } from '@/types';
import { Input } from '@/components/ui/Input';

interface EmployeeFormProps {
  errors: Record<string, string>;
  formData: EmployeeFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  errors,
  formData,
  onChange,
}) => {
  return (
    <>
      <Input
        label="Nome Completo"
        name="name"
        type="text"
        placeholder="Digite o nome do funcionário(a)"
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        minLength={3}
        maxLength={100}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Digite o email do funcionário(a)"
        value={formData.email}
        onChange={onChange}
        required
        error={errors.email}
      />

      <Input
        label="Telefone"
        name="phone"
        type="tel"
        placeholder="(99) 99999-9999"
        value={formData.phone}
        onChange={onChange}
        required
        error={errors.phone}
      />
    </>
  );
};
