import React from 'react';
import { Customer } from '@/types';
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
  const handleSave = async (data: Omit<Customer, 'id'> | { id: number; data: Omit<Customer, 'id'> }) => {
    // In add mode, data should always be Omit<Customer, 'id'>
    if ('id' in data) {
      return { success: false, error: 'Unexpected data format for add mode' };
    }
    return onSave(data);
  };

  return (
    <CustomerFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      mode="add"
    />
  );
};