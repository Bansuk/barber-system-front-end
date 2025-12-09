'use client';

import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { CrudContent } from '@/components/shared/CrudContent';
import { Customer } from '@/types';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { EditCustomerModal } from '@/components/customers/EditCustomerModal';
import { useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from '@/hooks/useCustomers';

interface CustomerContentProps {
  customers: Customer[];
}

export function CustomerContent({ customers }: CustomerContentProps) {
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const deleteMutation = useDeleteCustomer();

  return (
    <CrudContent<Customer>
      title='Clientes'
      buttonLabel='Novo Cliente'
      items={customers}
      mutations={{
        create: createMutation,
        update: updateMutation,
        delete: deleteMutation,
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
      entityName='cliente'
    />
  );
}