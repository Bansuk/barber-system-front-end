import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { useCustomerForm } from '@/components/customers/useCustomerForm';
import { Customer } from '@/types/customer';
import { useToast } from '@/contexts/ToastContext';

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  customer?: Customer | null;
  mode: 'add' | 'edit';
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  customer,
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
    toCustomerData,
  } = useCustomerForm({ initialData: customer });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      let result;

      if (mode === 'add') {
        result = await onSave(toCustomerData());
      } else {
        if (!customer) return;
        result = await onSave({ id: customer.id, data: toCustomerData() });
      }

      if (result.success) {
        showSuccess(
          mode === 'add'
            ? 'Cliente adicionado com sucesso!'
            : 'Cliente atualizado com sucesso!'
        );
        if (mode === 'add') {
          resetForm();
        }
        onClose();
      } else {
        showError(
          result.error ||
            `Falha ao ${mode === 'add' ? 'salvar' : 'atualizar'} cliente. Tente novamente.`
        );
      }
    } catch (error) {
      console.error(`Error ${mode === 'add' ? 'saving' : 'updating'} customer:`, error);
      showError(
        `Falha ao ${mode === 'add' ? 'salvar' : 'atualizar'} cliente. Tente novamente.`
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

  const title = mode === 'add' ? 'Adicionar Novo Cliente' : 'Editar Cliente';
  const submitLabel = mode === 'add' ? 'Salvar' : 'Atualizar';
  const loadingLabel = mode === 'add' ? 'Salvando...' : 'Atualizando...';

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title}>
      <form onSubmit={handleSubmit}>
        <CustomerForm formData={formData} errors={errors} onChange={handleChange} />

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
