import api from '@/lib/api';
import { DashboardStats } from '@/types/dashboard';

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> =>  api.get('/dashboard/stats')
};