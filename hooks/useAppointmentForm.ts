import { Appointment, AppointmentData, AppointmentFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Appointment | null): AppointmentFormData => ({
  customerId: initialData?.customerId ?? '',
  date: initialData?.date ?? '',
  employeeId: initialData?.employeeId ?? '',
  serviceIds: initialData?.serviceIds ?? [],
});

const validateAppointmentForm = (formData: AppointmentFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};

  if (!formData.customerId) newErrors.customerId = 'Cliente é obrigatório';
  if (!formData.employeeId) newErrors.employeeId = 'Funcionário é obrigatório';
  if (!formData.date) newErrors.date = 'Data e hora são obrigatórias';
  if (!formData.serviceIds || formData.serviceIds.length === 0) newErrors.serviceIds = 'Pelo menos um serviço deve ser selecionado';

  return newErrors;
};

const transformToAppointment = (formData: AppointmentFormData): AppointmentData => ({
  customerId: formData.customerId as number,
  date: formData.date,
  employeeId: formData.employeeId as number,
  serviceIds: formData.serviceIds,
});

const getEmptyFormData = (): AppointmentFormData => ({
  customerId: '',
  date: '',
  employeeId: '',
  serviceIds: [],
});

export const useAppointmentForm = (options: {
  initialData: Appointment | null | undefined;
}): FormHook<Appointment, AppointmentFormData> & { toAppointmentData: () => AppointmentData } => {
  const hook = useEntityForm<Appointment, AppointmentFormData>({
    initialData: options.initialData,
    createInitialFormData,
    validateForm: validateAppointmentForm,
    transformToEntity: transformToAppointment,
    getEmptyFormData,
  });

  return {
    ...hook,
    toAppointmentData: hook.toEntityData,
  };
};
