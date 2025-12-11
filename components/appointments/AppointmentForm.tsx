import React from 'react';
import { AppointmentFormData, Service, Customer, Employee } from '@/types';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { Select } from '@/components/ui/Select';
import { DateTimeInput } from '@/components/ui/DateTimeInput';

interface AppointmentFormProps {
  errors: Record<string, string>;
  formData: AppointmentFormData;
  onCustomerChange: (customerId: number) => void;
  onEmployeeChange: (employeeId: number) => void;
  onServiceChange: (serviceIds: number[]) => void;
  onDateChange: (date: string) => void;
  customers: Customer[];
  employees: Employee[];
  services: Service[];
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  errors,
  formData,
  onCustomerChange,
  onEmployeeChange,
  onServiceChange,
  onDateChange,
  customers,
  employees,
  services,
}) => {
  const selectedEmployee = employees.find(emp => emp.id === formData.employeeId);
  const availableServices = selectedEmployee 
    ? services.filter(service => selectedEmployee.serviceIds.includes(service.id))
    : [];

  return (
    <>
      <Select
        label='Cliente'
        name='customerId'
        options={customers}
        value={formData.customerId}
        onChange={onCustomerChange}
        required
        error={errors.customerId}
        placeholder='Selecione um cliente'
      />

      <Select
        label='Funcionário'
        name='employeeId'
        options={employees}
        value={formData.employeeId}
        onChange={onEmployeeChange}
        required
        error={errors.employeeId}
        placeholder='Selecione um funcionário'
      />

      <DateTimeInput
        label='Data e Hora'
        name='date'
        value={formData.date}
        onChange={onDateChange}
        required
        error={errors.date}
      />

      <MultiSelect
        label='Serviços'
        name='serviceIds'
        options={availableServices}
        selectedIds={formData.serviceIds}
        onChange={onServiceChange}
        required
        error={errors.serviceIds}
        disabled={!formData.employeeId}
        placeholder={!formData.employeeId ? 'Selecione um funcionário(a) primeiro' : 'Selecione os serviços'}
      />
    </>
  );
};
