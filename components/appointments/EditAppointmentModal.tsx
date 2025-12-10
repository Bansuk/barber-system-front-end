import React from 'react';
import { Appointment, AppointmentData, SaveResult } from '@/types';
import { AppointmentFormModal } from '@/components/appointments/AppointmentFormModal';

interface EditAppointmentModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, appointment: AppointmentData) => Promise<SaveResult>;
}

export const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onSave,
}) => {
  const handleSave = async (data: AppointmentData): Promise<SaveResult> => {
    if (!appointment) return { success: false, error: 'No appointment provided' };

    return onSave(appointment.id, data);
  };

  return (
    <AppointmentFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      appointment={appointment}
      mode='edit'
    />
  );
};
