'use client';

import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { useDashboardStats } from '@/hooks/useDashboard';

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (error) {
    return (
      <DashboardLayout>
        <PageHeader title="Dashboard" />
        <div className="text-red-500">Erro ao carregar estatísticas: {error.message}</div>
      </DashboardLayout>
    );
  }

  if (isLoading || !stats) {
    return (
      <DashboardLayout>
        <PageHeader title="Dashboard" />
        <div>Carregando estatísticas...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader title="Dashboard" />
      <DashboardContent stats={stats} />
    </DashboardLayout>
  );
}