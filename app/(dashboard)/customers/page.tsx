'use client';

import { CustomerContent } from '@/components/customers/CustomerContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useCustomers } from '@/hooks/useCustomers';
import { PageLoading } from '@/components/shared/Loading';

export default function CustomerManagementPage() {
  const { data: customers = [], isLoading, error } = useCustomers();

  const displayCustomrs = () => {
    if (error) return <div className="text-red-500">Erro ao carregar clientes: {error.message}</div>;
    if (isLoading) return <PageLoading text="Carregando clientes..." />;
    return <CustomerContent customers={customers} />;
}

  return (
    <DashboardLayout>
      {displayCustomrs()}
    </DashboardLayout>
  );
}