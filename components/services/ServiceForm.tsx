import React from 'react';
import { Input } from '@/components/ui/Input';

interface ServiceFormData {
  name: string;
  price: string;
}

interface ServiceFormProps {
  formData: ServiceFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <>
      <Input
        label="Nome"
        name="name"
        type="text"
        placeholder="Digite o nome do serviço"
        value={formData.name}
        onChange={onChange}
        required
        error={errors.name}
        minLength={3}
        maxLength={100}
      />

      <Input
        label="Preço"
        name="price"
        type="price"
        placeholder="R$ 0,00"
        value={formData.price}
        onChange={onChange}
        required
        error={errors.price}
      />

    </>
  );
};
