import api from '@/lib/api';
import { DashboardStats } from '@/types';

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const data: DashboardStats = await api.get('/dashboard/stats');
    
    return {
      totalCustomers: data.totalCustomers,
      activeEmployees: data.activeEmployees,
      availableServices: data.availableServices,
      appointments: data.appointments
    };
  }
};