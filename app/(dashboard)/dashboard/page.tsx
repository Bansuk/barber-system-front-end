import { dashboardService } from '@/services/dashboardService';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

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