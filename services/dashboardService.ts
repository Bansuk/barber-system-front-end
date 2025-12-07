import api from '@/lib/api';
import { DashboardStats } from '@/types/dashboard';

interface BackendDashboardStats {
  customers: number;
  employees: number;
  services: number;
  appointments: {
    total: number;
    past: number;
    upcoming: number;
  };
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const data: BackendDashboardStats = await api.get('/dashboard/stats');
    
    return {
      totalCustomers: data.customers,
      activeEmployees: data.employees,
      availableServices: data.services,
      appointments: data.appointments
    };
  }
};