import React from 'react';
import { AppointmentFormData, Service } from '@/types';
import { MultiSelect } from '@/components/ui/MultiSelect';

interface AppointmentFormProps {
  errors: Record<string, string>;
  formData: AppointmentFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onServiceChange: (serviceIds: number[]) => void;
  services: Service[];
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  errors,
  formData,
  onChange,
  onServiceChange,
  services,
}) => {
  return (
    <>
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
