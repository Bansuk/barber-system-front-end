import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { FormHook, SaveResult } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/contexts/ToastContext';

interface FormModalConfig {
  addErrorMessage: string;
  addSuccessMessage: string;
  addTitle: string;
  editErrorMessage: string;
  editSuccessMessage: string;
  editTitle: string;
  entityName: string;
}

interface FormModalProps<T extends { id: number }, D> {
  config: FormModalConfig;
  entity?: T | null;
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (data: Omit<T, 'id'>) => Promise<SaveResult>;
  renderForm: (formData: D, errors: Record<string, string>, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => ReactNode;
  useFormHook: (options: { initialData: T | null | undefined }) => FormHook<T, D>;
}

export function FormModal<T extends { id: number }, D>({
  config,
  entity,
  isOpen,
  mode,
  onClose,
  onSave,
  renderForm,
  useFormHook,
}: FormModalProps<T, D>) {
  const { showSuccess, showError } = useToast();
  const {
    clearErrors,
    errors,
    formData,
    handleChange,
    loading,
    resetForm,
    setLoading,
    toEntityData,
    validateForm,
  } = useFormHook({ initialData: entity });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const result = await onSave(toEntityData());

      if (result.success) {
        showSuccess(
          mode === 'add'
            ? config.addSuccessMessage
            : config.editSuccessMessage
        );
        if (mode === 'add') resetForm();
        onClose();
      } else
        showError(
          result.error ||
            (mode === 'add' ? config.addErrorMessage : config.editErrorMessage)
        );
    } catch (error) {
      console.error(`Error ${mode === 'add' ? 'saving' : 'updating'} ${config.entityName}:`, error);
      showError(
        mode === 'add' ? config.addErrorMessage : config.editErrorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (mode === 'add') resetForm();
    else clearErrors();
    onClose();
  };

  const title = mode === 'add' ? config.addTitle : config.editTitle;
  const submitLabel = mode === 'add' ? 'Salvar' : 'Atualizar';
  const loadingLabel = mode === 'add' ? 'Salvando...' : 'Atualizando...';

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title}>
      <form onSubmit={handleSubmit}>
        {renderForm(formData, errors, handleChange)}

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? loadingLabel : submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
