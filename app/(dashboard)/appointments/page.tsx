'use client';

import { AppointmentContent } from '@/components/appointments/AppointmentContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageError } from '@/components/shared/ErrorMessage';
import { PageLoading } from '@/components/shared/Loading';
import { useAppointments } from '@/hooks/useAppointments';

export default function AppointmentManagementPage() {
  const { data: appointments = [], isLoading, error } = useAppointments();

  const displayAppointments = () => {
    if (error) return <PageError message={error.message} title='Erro ao carregar agendamentos' />
    if (isLoading) return <PageLoading text='Carregando agendamentos...' />;
    return <AppointmentContent appointments={appointments} />;
  }

  return (
    <DashboardLayout>
      {displayAppointments()}
    </DashboardLayout>
  );
}