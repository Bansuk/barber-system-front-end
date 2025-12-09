import React from 'react';
import { Service, ServiceData, SaveResult } from '@/types';
import { ServiceFormModal } from '@/components/services/ServiceFormModal';

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, service: ServiceData) => Promise<SaveResult>;
  service: Service | null;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  service,
}) => {
  const handleSave = async (data: ServiceData): Promise<SaveResult> => {
    if (!service) return { success: false, error: 'No service provided' };

    return onSave(service.id, data);
  };

  return (
    <ServiceFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      service={service}
      mode='edit'
    />
  );
};
