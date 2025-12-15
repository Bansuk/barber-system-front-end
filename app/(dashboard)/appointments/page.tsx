'use client';

import { AppointmentContent } from '@/components/appointments/AppointmentContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageError } from '@/components/shared/ErrorMessage';
import { PageLoading } from '@/components/shared/Loading';
import { useAppointments } from '@/hooks/useAppointments';
import { translateApiError } from '@/lib/translations';

export default function AppointmentManagementPage() {
  const { data: appointments = [], isLoading, error } = useAppointments();

  const displayAppointments = () => {
    if (error) return <PageError message={translateApiError(error)} title='Erro ao carregar agendamentos' />
    if (isLoading) return <PageLoading text='Carregando agendamentos...' />;
    return <AppointmentContent appointments={appointments} />;
  }

  return (
    <DashboardLayout>
      {displayAppointments()}
    </DashboardLayout>
  );
}