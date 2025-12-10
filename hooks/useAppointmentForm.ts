import { Appointment, AppointmentData, AppointmentFormData, FormHook } from '@/types';
import { useEntityForm } from '@/hooks/useEntityForm';

const createInitialFormData = (initialData?: Appointment | null): AppointmentFormData => ({
  serviceIds: initialData?.serviceIds ?? [],
});

const validateAppointmentForm = (formData: AppointmentFormData): Record<string, string> => {
  const newErrors: Record<string, string> = {};

  if (!formData.serviceIds || formData.serviceIds.length === 0) newErrors.serviceIds = 'At least one service must be selected';

  return newErrors;
};

const transformToAppointment = (formData: AppointmentFormData): AppointmentData => ({
  serviceIds: formData.serviceIds,
});

const getEmptyFormData = (): AppointmentFormData => ({
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
