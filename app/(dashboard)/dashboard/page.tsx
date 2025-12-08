import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { dashboardService } from '@/services/dashboardService';
import { PageHeader } from '@/components/layout/PageHeader';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const stats = await dashboardService.getStats();  

  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
      />
      <DashboardContent stats={stats} />
    </DashboardLayout>
  );
}