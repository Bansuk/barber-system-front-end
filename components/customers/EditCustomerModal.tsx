import React from 'react';
import { Customer } from '@/types/customer';
import { CustomerFormModal } from '@/components/customers/CustomerFormModal';

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, customer: Partial<Customer>) => Promise<{ success: boolean; error?: string }>;
  customer: Customer | null;
}

export const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  customer,
}) => {
  const handleSave = async (data: any) => {
    if (data.id) {
      return onSave(data.id, data.data);
    }
    return { success: false, error: 'No ID provided' };
  };

  return (
    <CustomerFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      customer={customer}
      mode="edit"
    />
  );
};
