import React from 'react';
import { Employee, EmployeeData, EmployeeFormData, SaveResult, Service } from '@/types';
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

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  employee,
  isOpen,
  mode,
  onClose,
  onSave,
}) => {
  const { services } = useEmployeeForm({ initialData: employee });

  const renderEmployeeForm = (
    formData: EmployeeFormData,
    errors: Record<string, string>,
    handleChange: (field: string, value: unknown) => void
  ) => {
    const handleServiceChange = (serviceIds: number[]) => {
      handleChange('serviceIds', serviceIds);
    };

    return (
      <EmployeeForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onServiceChange={handleServiceChange}
        services={services}
      />
    );
  };

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
