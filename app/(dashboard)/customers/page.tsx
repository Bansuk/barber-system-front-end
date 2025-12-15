'use client';

import { CustomerContent } from '@/components/customers/CustomerContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageError } from '@/components/shared/ErrorMessage';
import { PageLoading } from '@/components/shared/Loading';
import { useCustomers } from '@/hooks/useCustomers';
import { translateApiError } from '@/lib/translations';

export default function CustomerManagementPage() {
  const { data: customers = [], isLoading, error } = useCustomers();

  const displayCustomers = () => {
    if (error) return <PageError message={translateApiError(error)} title='Erro ao carregar clientes' />
    if (isLoading) return <PageLoading text='Carregando clientes...' />;
    return <CustomerContent customers={customers} />;
  }

  return (
    <DashboardLayout>
      {displayCustomers()}
    </DashboardLayout>
  );
}