import React from 'react';
import { Customer } from '@/types/customer';
import { formatPhoneNumber } from '@/lib/utils/phoneMask';
import { DataTable, Column } from '@/components/shared/DataTable';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const customerColumns: Column<Customer>[] = [
  {
    key: 'name',
    label: 'Nome',
    render: (customer) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium text-gray-900">{customer.name}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'email',
    label: 'Email',
    render: (customer) => customer.email,
  },
  {
    key: 'phone',
    label: 'Telefone',
    render: (customer) => formatPhoneNumber(customer.phone_number),
  },
];

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onEdit,
  onDelete
}) => {
  return (
    <DataTable
      items={customers}
      columns={customerColumns}
      onEdit={onEdit}
      onDelete={onDelete}
      editAriaLabel="Edit customer"
      deleteAriaLabel="Delete customer"
    />
  );
};