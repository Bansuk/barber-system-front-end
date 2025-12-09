import React, { useEffect, useState } from 'react';
import { Employee, EmployeeData, EmployeeFormData, SaveResult, Service } from '@/types';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useEmployeeForm } from '@/hooks/useEmployeeForm';
import { serviceService } from '@/services/serviceService';
import { useToast } from '@/contexts/ToastContext';

interface EmployeeFormModalProps {
  employee?: Employee | null;
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (data: EmployeeData) => Promise<SaveResult>;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  employee,
  isOpen,
  mode,
  onClose,
  onSave,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
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
  } = useEmployeeForm({ initialData: employee });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await serviceService.getAll();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoadingServices(false);
      }
    };

    if (isOpen) {
      fetchServices();
    }
  }, [isOpen]);

  const handleServiceChange = (serviceIds: number[]) => {
    handleChange('serviceIds', serviceIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const result = await onSave(toEntityData());

      if (result.success) {
        showSuccess(
          mode === 'add'
            ? 'Funcionário(a) adicionado com sucesso!'
            : 'Funcionário(a) atualizado com sucesso!'
        );
        if (mode === 'add') resetForm();
        onClose();
      } else {
        showError(
          result.error ||
            (mode === 'add'
              ? 'Falha ao salvar funcionário(a). Tente novamente.'
              : 'Falha ao atualizar funcionário(a). Tente novamente.')
        );
      }
    } catch (error) {
      console.error(`Error ${mode === 'add' ? 'saving' : 'updating'} employee:`, error);
      showError(
        mode === 'add'
          ? 'Falha ao salvar funcionário(a). Tente novamente.'
          : 'Falha ao atualizar funcionário(a). Tente novamente.'
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

  const title = mode === 'add' ? 'Adicionar Novo Funcionário(a)' : 'Editar Funcionário(a)';
  const submitLabel = mode === 'add' ? 'Salvar' : 'Atualizar';
  const loadingLabel = mode === 'add' ? 'Salvando...' : 'Atualizando...';

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title}>
      <form onSubmit={handleSubmit}>
        <EmployeeForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onServiceChange={handleServiceChange}
          services={services}
        />

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
};
