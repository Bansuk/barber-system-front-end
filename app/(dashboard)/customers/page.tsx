import { customerService } from '@/services/customerService';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CustomersContent } from '@/components/customers/CustomerContent';

export default async function CustomerManagementPage() {
  const customers = await customerService.getAll();  

  return (
    <DashboardLayout>
      <CustomersContent customers={customers} />
    </DashboardLayout>
  );
}