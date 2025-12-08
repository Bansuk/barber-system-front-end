import { serviceService } from '@/services/serviceService';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ServicesContent } from '@/components/services/ServiceContent';

export const dynamic = 'force-dynamic';

export default async function CustomerManagementPage() {
  const services = await serviceService.getAll();  

  return (
    <DashboardLayout>
      <ServicesContent services={services} />
    </DashboardLayout>
  );
}