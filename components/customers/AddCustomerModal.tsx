import React from 'react';
import { CustomerData, SaveResult } from '@/types';
import { CustomerFormModal } from '@/components/customers/CustomerFormModal';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CustomerData) => Promise<SaveResult>;
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
      mode='add'
    />
  );
};