import React from 'react';
import { Appointment, Column, Customer, Employee } from '@/types';
import { DataTable } from '@/components/shared/DataTable';

interface AppointmentTableProps {
  appointments: Appointment[];
  customers: Customer[];
  employees: Employee[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  customers,
  employees,
  onEdit,
  onDelete
}) => {
  const getCustomerName = (customerId: number): string => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : `ID: ${customerId}`;
  };

  const getEmployeeName = (employeeId: number): string => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : `ID: ${employeeId}`;
  };

  const appointmentColumns: Column<Appointment>[] = [
    {
      key: 'customerId',
      label: 'Cliente',
      render: (appointment) => getCustomerName(appointment.customerId),
    },
    {
      key: 'employeeId',
      label: 'Funcionário',
      render: (appointment) => getEmployeeName(appointment.employeeId),
    },
    {
      key: 'date',
      label: 'Data e Hora',
      render: (appointment) => new Date(appointment.date.replace(' ', 'T')).toLocaleString('pt-BR'),
    },
    {
      key: 'serviceIds',
      label: 'Serviços',
      render: (appointment) => appointment.serviceIds.join(', '),
    },
  ];

  return (
    <DataTable
      items={appointments}
      columns={appointmentColumns}
      onEdit={onEdit}
      onDelete={onDelete}
      editAriaLabel='Edit appointment'
      deleteAriaLabel='Delete appointment'
    />
  );
};