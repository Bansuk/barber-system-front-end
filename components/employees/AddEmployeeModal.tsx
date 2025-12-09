import React from 'react';
import { EmployeeData, SaveResult } from '@/types';
import { EmployeeFormModal } from '@/components/employees/EmployeeFormModal';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EmployeeData) => Promise<SaveResult>;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  return (
    <EmployeeFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      mode='add'
    />
  );
};