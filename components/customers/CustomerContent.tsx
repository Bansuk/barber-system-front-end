'use client';

import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { createCustomer, updateCustomer, deleteCustomer } from '@/app/(dashboard)/customers/actions';
import { CrudContent } from '@/components/shared/CrudContent';
import { Customer } from '@/types';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { EditCustomerModal } from '@/components/customers/EditCustomerModal';

interface CustomersContentProps {
  customers: Customer[];
}

export function CustomersContent({ customers }: CustomersContentProps) {
  return (
    <CrudContent<Customer>
      title="Clientes"
      buttonLabel="Novo Cliente"
      items={customers}
      actions={{
        create: createCustomer,
        update: updateCustomer,
        delete: deleteCustomer,
      }}
      renderTable={(items, onEdit, onDelete) => (
        <CustomerTable
          customers={items}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderAddModal={(isOpen, onClose, onSave) => (
        <AddCustomerModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
        />
      )}
      renderEditModal={(isOpen, onClose, onSave, item) => (
        <EditCustomerModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
          customer={item}
        />
      )}
      entityName="cliente"
    />
  );
}