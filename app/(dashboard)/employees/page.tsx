import { EmployeeContent } from '@/components/employees/EmployeeContent';
import { employeeService } from '@/services/employeeService';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const dynamic = 'force-dynamic';

export default async function EmployeeManagementPage() {
  const employees = await employeeService.getAll();  

  return (
    <DashboardLayout>
      <EmployeeContent employees={employees} />
    </DashboardLayout>
  );
}