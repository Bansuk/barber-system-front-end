import React from 'react';
import { Service } from '@/types/service';
import { ServiceFormModal } from '@/components/services/ServiceFormModal';

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, service: Partial<Service>) => Promise<{ success: boolean; error?: string }>;
  service: Service | null;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  service,
}) => {
  const handleSave = async ({ id, data }: { id: number; data: Partial<Service> }) => {
    return onSave(id, data);
  };

  return (
    <ServiceFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      service={service}
      mode="edit"
    />
  );
};
