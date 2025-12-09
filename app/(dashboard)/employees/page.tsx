'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EmployeeContent } from '@/components/employees/EmployeeContent';
import { PageError } from '@/components/shared/ErrorMessage';
import { PageLoading } from '@/components/shared/Loading';
import { useEmployees } from '@/hooks/useEmployees';

export default function EmployeeManagementPage() {
  const { data: employees = [], isLoading, error } = useEmployees();

  const displayEmployees = () => {
    if (error) return <PageError message={error.message} title='Erro ao carregar funcionários' />
    if (isLoading) return <PageLoading text='Carregando funcionários...' />;
    return <EmployeeContent employees={employees} />;
  }

  return (
    <DashboardLayout>
      {displayEmployees()}
    </DashboardLayout>
  );
}