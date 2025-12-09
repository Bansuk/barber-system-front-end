'use client';

import { CustomerContent } from '@/components/customers/CustomerContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useCustomers } from '@/hooks/useCustomers';
import { PageLoading } from '@/components/shared/Loading';

export default function CustomerManagementPage() {
  const { data: customers = [], isLoading, error } = useCustomers();

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Erro ao carregar clientes: {error.message}</div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageLoading text="Carregando clientes..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <CustomerContent customers={customers} />
    </DashboardLayout>
  );
}