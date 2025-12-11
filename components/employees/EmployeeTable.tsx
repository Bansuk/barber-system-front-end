import React from 'react';
import { Employee, Column } from '@/types';
import { DataTable } from '@/components/shared/DataTable';
import { formatPhoneNumber } from '@/lib/utils/phoneMask';
import { employeeStatusConfig, renderStatusBadge } from '@/lib/utils/statusConfig';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const employeeColumns: Column<Employee>[] = [
  {
    key: 'name',
    label: 'Nome',
    render: (employee) => (
      <div className='flex items-center gap-3'>
        <div>
          <div className='font-medium text-gray-900'>{employee.name}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'email',
    label: 'Email',
    render: (employee) => employee.email,
  },
  {
    key: 'phone',
    label: 'Telefone',
    render: (employee) => formatPhoneNumber(employee.phoneNumber),
  },
  {
    key: 'status',
    label: 'Situação',
    render: (employee) => renderStatusBadge(employee.status, employeeStatusConfig),
  },
];

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete
}) => {
  return (
    <DataTable
      items={employees}
      columns={employeeColumns}
      onEdit={onEdit}
      onDelete={onDelete}
      editAriaLabel='Edit employee'
      deleteAriaLabel='Delete employee'
    />
  );
};