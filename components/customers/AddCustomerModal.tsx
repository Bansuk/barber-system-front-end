import React from 'react';
import { Customer } from '@/types/customer';
import { CustomerFormModal } from '@/components/customers/CustomerFormModal';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id'>) => Promise<{ success: boolean; error?: string }>;
}

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <CustomerFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      mode="add"
    />
  );
};