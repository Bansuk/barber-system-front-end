import React from 'react';
import { ServiceForm } from './ServiceForm';
import { useServiceForm } from './useServiceForm';
import { Service } from '@/types/service';
import { FormModal } from '@/components/shared/FormModal';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  service?: Service | null;
  mode: 'add' | 'edit';
}

interface ServiceFormData {
  name: string;
  price: string;
}

const serviceFormConfig = {
  addTitle: 'Adicionar Novo Serviço',
  editTitle: 'Editar Serviço',
  addSuccessMessage: 'Serviço adicionado com sucesso!',
  editSuccessMessage: 'Serviço atualizado com sucesso!',
  addErrorMessage: 'Falha ao salvar serviço. Tente novamente.',
  editErrorMessage: 'Falha ao atualizar serviço. Tente novamente.',
  entityName: 'service',
};

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  service,
  mode,
}) => {
  return (
    <FormModal<Service, ServiceFormData>
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      entity={service}
      mode={mode}
      useFormHook={useServiceForm}
      renderForm={(formData, errors, onChange) => (
        <ServiceForm formData={formData} errors={errors} onChange={onChange} />
      )}
      config={serviceFormConfig}
    />
  );
};
