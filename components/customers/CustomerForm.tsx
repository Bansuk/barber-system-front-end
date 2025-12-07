import React from 'react';
import { Input } from '@/components/ui/Input';

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

interface CustomerFormProps {
  formData: CustomerFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <>
      <Input
        label="Nome Completo"
        name="name"
        type="text"
        placeholder="Digite o nome do cliente"
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
        placeholder="Digite o email do cliente"
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
