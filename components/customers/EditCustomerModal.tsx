import React from 'react';
import { Customer, CustomerData, SaveResult } from '@/types';
import { CustomerFormModal } from '@/components/customers/CustomerFormModal';

interface EditCustomerModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, customer: CustomerData) => Promise<SaveResult>;
}

export const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  customer,
  isOpen,
  onClose,
  onSave,
}) => {
  const handleSave = async (data: CustomerData): Promise<SaveResult> => {
    if (!customer) return { success: false, error: 'No customer provided' };

    return onSave(customer.id, data);
  };

  return (
    <CustomerFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      customer={customer}
      mode='edit'
    />
  );
};
