import React from 'react';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { useCustomerForm } from '@/components/customers/useCustomerForm';
import { Customer, CustomerFormData } from '@/types';
import { FormModal } from '@/components/shared/FormModal';

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  customer?: Customer | null;
  mode: 'add' | 'edit';
}

const customerFormConfig = {
  addTitle: 'Adicionar Novo Cliente',
  editTitle: 'Editar Cliente',
  addSuccessMessage: 'Cliente adicionado com sucesso!',
  editSuccessMessage: 'Cliente atualizado com sucesso!',
  addErrorMessage: 'Falha ao salvar cliente. Tente novamente.',
  editErrorMessage: 'Falha ao atualizar cliente. Tente novamente.',
  entityName: 'customer',
};

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  customer,
  mode,
}) => {
  return (
    <FormModal<Customer, CustomerFormData>
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      entity={customer}
      mode={mode}
      useFormHook={useCustomerForm}
      renderForm={(formData, errors, onChange) => (
        <CustomerForm formData={formData} errors={errors} onChange={onChange} />
      )}
      config={customerFormConfig}
    />
  );
};
