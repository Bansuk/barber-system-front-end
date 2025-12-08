import { CustomersContent } from '@/components/customers/CustomerContent';
import { customerService } from '@/services/customerService';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export const dynamic = 'force-dynamic';

export default async function CustomerManagementPage() {
  const customers = await customerService.getAll();  

  return (
    <DashboardLayout>
      <CustomersContent customers={customers} />
    </DashboardLayout>
  );
}