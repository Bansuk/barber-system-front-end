import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ServicesContent } from '@/components/services/ServiceContent';
import { serviceService } from '@/services/serviceService';

export const dynamic = 'force-dynamic';

export default async function ServiceManagementPage() {
  const services = await serviceService.getAll();  

  return (
    <DashboardLayout>
      <ServicesContent services={services} />
    </DashboardLayout>
  );
}