import React from 'react';
import { Service } from '@/types/service';
import { ServiceFormModal } from './ServiceFormModal';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id'>) => Promise<{ success: boolean; error?: string }>;
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