'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageError } from '@/components/shared/ErrorMessage';
import { PageLoading } from '@/components/shared/Loading';
import { ServiceContent } from '@/components/services/ServiceContent';
import { useServices } from '@/hooks/useServices';
import { translateApiError } from '@/lib/translations';

export default function ServiceManagementPage() {
  const { data: services = [], isLoading, error } = useServices();

  const displayServices = () => {
    if (error) return <PageError message={translateApiError(error)} title='Erro ao carregar serviços' />
    if (isLoading) return <PageLoading text='Carregando serviços...' />;
    return <ServiceContent services={services} />;
  }

  return (
    <DashboardLayout>
      {displayServices()}
    </DashboardLayout>
  );
}