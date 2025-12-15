'use client';

import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageError } from '@/components/shared/ErrorMessage';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageLoading } from '@/components/shared/Loading';
import { useDashboardStats } from '@/hooks/useDashboard';
import { translateApiError } from '@/lib/translations';

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useDashboardStats();

  const displayDashboard = () => {
    if (error) return <PageError message={translateApiError(error)} title='Erro ao carregar dashboard' />
    if (isLoading || !stats) return <PageLoading text='Carregando dashboard...' />;
    return <DashboardContent stats={stats} />;
  }

  return (
    <DashboardLayout>
      <PageHeader title='Dashboard' />
      {displayDashboard()}
    </DashboardLayout>
  );
}