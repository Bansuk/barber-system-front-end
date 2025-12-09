import React from 'react';
import { ServiceData, SaveResult } from '@/types';
import { ServiceFormModal } from '@/components/services/ServiceFormModal';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServiceData) => Promise<SaveResult>;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <ServiceFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      mode="add"
    />
  );
};