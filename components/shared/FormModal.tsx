import React, { ReactNode } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

interface FormHook<T, D> {
  formData: D;
  loading: boolean;
  errors: Record<string, string>;
  setLoading: (loading: boolean) => void;
  handleChange: (field: keyof D | React.ChangeEvent<HTMLInputElement>, value?: any) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  clearErrors: () => void;
  toEntityData: () => Omit<T, 'id'>;
}

interface FormModalConfig {
  addTitle: string;
  editTitle: string;
  addSuccessMessage: string;
  editSuccessMessage: string;
  addErrorMessage: string;
  editErrorMessage: string;
  entityName: string;
}

interface FormModalProps<T extends { id: number }, D> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<{ success: boolean; error?: string }>;
  entity?: T | null;
  mode: 'add' | 'edit';
  useFormHook: (options: { initialData: T | null | undefined }) => FormHook<T, D>;
  renderForm: (formData: D, errors: Record<string, string>, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => ReactNode;
  config: FormModalConfig;
}

export function FormModal<T extends { id: number }, D>({
  isOpen,
  onClose,
  onSave,
  entity,
  mode,
  useFormHook,
  renderForm,
  config,
}: FormModalProps<T, D>) {
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
    toEntityData,
  } = useFormHook({ initialData: entity });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      let result;

      if (mode === 'add') {
        result = await onSave(toEntityData());
      } else {
        if (!entity) return;
        result = await onSave({ id: entity.id, data: toEntityData() });
      }

      if (result.success) {
        showSuccess(
          mode === 'add'
            ? config.addSuccessMessage
            : config.editSuccessMessage
        );
        if (mode === 'add') {
          resetForm();
        }
        onClose();
      } else {
        showError(
          result.error ||
            (mode === 'add' ? config.addErrorMessage : config.editErrorMessage)
        );
      }
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
    if (mode === 'add') {
      resetForm();
    } else {
      clearErrors();
    }
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
