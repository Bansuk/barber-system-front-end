import React from 'react';
import { Customer, CustomerData, CustomerFormData, SaveResult } from '@/types';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { FormModal } from '@/components/shared/FormModal';
import { useCustomerForm } from '@/components/customers/useCustomerForm';

interface CustomerFormModalProps {
  customer?: Customer | null;
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (data: CustomerData) => Promise<SaveResult>;
}

const customerFormConfig = {
  addErrorMessage: 'Falha ao salvar cliente. Tente novamente.',
  addSuccessMessage: 'Cliente adicionado com sucesso!',
  addTitle: 'Adicionar Novo Cliente',
  editErrorMessage: 'Falha ao atualizar cliente. Tente novamente.',
  editSuccessMessage: 'Cliente atualizado com sucesso!',
  editTitle: 'Editar Cliente',
  entityName: 'customer',
};

const renderCustomerForm = (
  formData: CustomerFormData,
  errors: Record<string, string>,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => (
  <CustomerForm formData={formData} errors={errors} onChange={onChange} />
);

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  customer,
  isOpen,
  mode,
  onClose,
  onSave,
}) => {
  return (
    <FormModal<Customer, CustomerFormData>
      key={customer?.id ?? 'new'}
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      entity={customer}
      mode={mode}
      useFormHook={useCustomerForm}
      renderForm={renderCustomerForm}
      config={customerFormConfig}
    />
  );
};
