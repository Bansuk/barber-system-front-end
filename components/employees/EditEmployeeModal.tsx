import React from 'react';
import { Employee, EmployeeData, SaveResult } from '@/types';
import { EmployeeFormModal } from '@/components/employees/EmployeeFormModal';

interface EditEmployeeModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, employee: EmployeeData) => Promise<SaveResult>;
}

export const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  employee,
  isOpen,
  onClose,
  onSave,
}) => {
  const handleSave = async (data: EmployeeData): Promise<SaveResult> => {
    if (!employee) return { success: false, error: 'No employee provided' };

    return onSave(employee.id, data);
  };

  return (
    <EmployeeFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      employee={employee}
      mode="edit"
    />
  );
};
