import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ServiceForm } from './ServiceForm';
import { useServiceForm } from './useServiceForm';
import { Service } from '@/types/service';
import { useToast } from '@/contexts/ToastContext';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  service?: Service | null;
  mode: 'add' | 'edit';
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  service,
  mode,
}) => {
  const { showSuccess, showError } = useToast();
  const {
    formData,
    loading,
    errors,
    setLoading,
    handleChange,
    validateForm,
    resetForm,
    clearErrors,
    toServiceData,
  } = useServiceForm({ initialData: service });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      let result;

      if (mode === 'add') {
        result = await onSave(toServiceData());
      } else {
        if (!service) return;
        result = await onSave({ id: service.id, data: toServiceData() });
      }

      if (result.success) {
        showSuccess(
          mode === 'add'
            ? 'Serviço adicionado com sucesso!'
            : 'Serviço atualizado com sucesso!'
        );
        if (mode === 'add') {
          resetForm();
        }
        onClose();
      } else {
        showError(
          result.error ||
            `Falha ao ${mode === 'add' ? 'salvar' : 'atualizar'} serviço. Tente novamente.`
        );
      }
    } catch (error) {
      console.error(`Error ${mode === 'add' ? 'saving' : 'updating'} service:`, error);
      showError(
        `Falha ao ${mode === 'add' ? 'salvar' : 'atualizar'} serviço. Tente novamente.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (mode === 'add') {
      resetForm();
    } else {
      clearErrors();
    }
    onClose();
  };

  const title = mode === 'add' ? 'Adicionar Novo Serviço' : 'Editar Serviço';
  const submitLabel = mode === 'add' ? 'Salvar' : 'Atualizar';
  const loadingLabel = mode === 'add' ? 'Salvando...' : 'Atualizando...';

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title}>
      <form onSubmit={handleSubmit}>
        <ServiceForm formData={formData} errors={errors} onChange={handleChange} />

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            fullWidth
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? loadingLabel : submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
