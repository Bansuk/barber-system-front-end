import React from 'react';
import { Appointment, AppointmentData, AppointmentFormData, SaveResult } from '@/types';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';
import { FormModal } from '@/components/shared/FormModal';
import { useAppointmentForm } from '@/hooks/useAppointmentForm';
import { useServices } from '@/hooks/useServices';

interface AppointmentFormModalProps {
  appointment?: Appointment | null;
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSave: (data: AppointmentData) => Promise<SaveResult>;
}

const appointmentFormConfig = {
  addErrorMessage: 'Falha ao salvar agendamento. Tente novamente.',
  addSuccessMessage: 'Agendamento adicionado com sucesso!',
  addTitle: 'Adicionar Novo Agendamento',
  editErrorMessage: 'Falha ao atualizar agendamento. Tente novamente.',
  editSuccessMessage: 'Agendamento atualizado com sucesso!',
  editTitle: 'Editar Agendamento',
  entityName: 'appointment',
};

export const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
  appointment,
  isOpen,
  mode,
  onClose,
  onSave,
}) => {
  const { data: services = [], isLoading: isLoadingServices } = useServices();

  const renderAppointmentForm = (
    formData: AppointmentFormData,
    errors: Record<string, string>,
    handleChange: (field: keyof AppointmentFormData | React.ChangeEvent<HTMLInputElement>, value?: unknown) => void
  ) => {
    const handleServiceChange = (serviceIds: number[]) => {
      handleChange('serviceIds', serviceIds);
    };

    if (isLoadingServices)
      return (
        <div className='py-4 text-center text-gray-500'>
          Carregando serviços...
        </div>
      );

    return (
      <AppointmentForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onServiceChange={handleServiceChange}
        services={services}
      />
    );
  };

  return (
    <FormModal<Appointment, AppointmentFormData>
      key={appointment?.id ?? 'new'}
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      entity={appointment}
      mode={mode}
      useFormHook={useAppointmentForm}
      renderForm={renderAppointmentForm}
      config={appointmentFormConfig}
    />
  );
};
