import React from 'react';
import { Employee, EmployeeData, EmployeeFormData, SaveResult } from '@/types';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { FormModal } from '@/components/shared/FormModal';
import { useEmployeeForm } from '@/hooks/useEmployeeForm';

interface EmployeeFormModalProps {
  employee?: Employee | null;
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (data: EmployeeData) => Promise<SaveResult>;
}

const employeeFormConfig = {
  addErrorMessage: 'Falha ao salvar funcionário(a). Tente novamente.',
  addSuccessMessage: 'Funcionário(a) adicionado com sucesso!',
  addTitle: 'Adicionar Novo Funcionário(a)',
  editErrorMessage: 'Falha ao atualizar funcionário(a). Tente novamente.',
  editSuccessMessage: 'Funcionário(a) atualizado com sucesso!',
  editTitle: 'Editar Funcionário(a)',
  entityName: 'employee',
};

const renderEmployeeForm = (
  formData: EmployeeFormData,
  errors: Record<string, string>,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => (
  <EmployeeForm formData={formData} errors={errors} onChange={onChange} />
);

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  employee,
  isOpen,
  mode,
  onClose,
  onSave,
}) => {
  return (
    <FormModal<Employee, EmployeeFormData>
      key={employee?.id ?? 'new'}
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      entity={employee}
      mode={mode}
      useFormHook={useEmployeeForm}
      renderForm={renderEmployeeForm}
      config={employeeFormConfig}
    />
  );
};
