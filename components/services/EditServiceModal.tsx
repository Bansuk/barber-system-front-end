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
  const handleSave = async (data: any) => {
    if (data.id) {
      return onSave(data.id, data.data);
    }
    return { success: false, error: 'No ID provided' };
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
