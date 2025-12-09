'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ServiceContent } from '@/components/services/ServiceContent';
import { useServices } from '@/hooks/useServices';

export default function ServiceManagementPage() {
  const { data: services = [], isLoading, error } = useServices();

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Erro ao carregar serviços: {error.message}</div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div>Carregando serviços...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ServiceContent services={services} />
    </DashboardLayout>
  );
}