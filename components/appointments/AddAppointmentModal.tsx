import React from 'react';
import { AppointmentData, SaveResult } from '@/types';
import { AppointmentFormModal } from '@/components/appointments/AppointmentFormModal';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AppointmentData) => Promise<SaveResult>;
}

export const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <AppointmentFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      mode='add'
    />
  );
};