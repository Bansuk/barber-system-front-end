'use client';

import { EmployeeContent } from '@/components/employees/EmployeeContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useEmployees } from '@/hooks/useEmployees';

export default function EmployeeManagementPage() {
  const { data: employees = [], isLoading, error } = useEmployees();

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Erro ao carregar funcionários: {error.message}</div>
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div>Carregando funcionários...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <EmployeeContent employees={employees} />
    </DashboardLayout>
  );
}