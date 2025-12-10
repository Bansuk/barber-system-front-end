import React from 'react';
import { Appointment, Column, Customer, Employee, Service } from '@/types';
import { DataTable } from '@/components/shared/DataTable';
import { priceMask } from '@/lib/utils/priceMask';

interface AppointmentTableProps {
  appointments: Appointment[];
  customers: Customer[];
  employees: Employee[];
  services: Service[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}
export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  customers,
  employees,
  services,
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

  const getServiceNames = (serviceIds: number[]): React.ReactNode => {
    return (
      <div className='flex flex-col gap-1'>
        {serviceIds.map(serviceId => {
          const service = services.find(s => s.id === serviceId);
          return (
            <div key={serviceId}>
              {service ? service.name : `ID: ${serviceId}`}
            </div>
          );
        })}
      </div>
    );
  };

  const getTotalValue = (serviceIds: number[]): string => {
    const total = serviceIds.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return sum + (service ? service.price : 0);
    }, 0);
    return priceMask(total);
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
      render: (appointment) => getServiceNames(appointment.serviceIds),
    },
    {
      key: 'value',
      label: 'Valor',
      render: (appointment) => getTotalValue(appointment.serviceIds),
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