import React from 'react';
import { FormModal } from '@/components/shared/FormModal';
import { Service, ServiceData, ServiceFormData, SaveResult } from '@/types';
import { ServiceForm } from './ServiceForm';
import { useServiceForm } from '@/hooks/useServiceForm';

interface ServiceFormModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (data: ServiceData) => Promise<SaveResult>;
  service?: Service | null;
}

const serviceFormConfig = {
  addErrorMessage: 'Falha ao salvar serviço. Tente novamente.',
  addSuccessMessage: 'Serviço adicionado com sucesso!',
  addTitle: 'Adicionar Novo Serviço',
  editErrorMessage: 'Falha ao atualizar serviço. Tente novamente.',
  editSuccessMessage: 'Serviço atualizado com sucesso!',
  editTitle: 'Editar Serviço',
  entityName: 'service',
};

const renderServiceForm = (
  formData: ServiceFormData,
  errors: Record<string, string>,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => (
  <ServiceForm formData={formData} errors={errors} onChange={onChange} />
);

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  service,
  mode,
}) => {
  return (
    <FormModal<Service, ServiceFormData>
      key={service?.id ?? 'new'}
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      entity={service}
      mode={mode}
      useFormHook={useServiceForm}
      renderForm={renderServiceForm}
      config={serviceFormConfig}
    />
  );
};
