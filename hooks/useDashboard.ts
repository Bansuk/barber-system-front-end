import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';

export const dashboardKeys = {
  stats: ['dashboard', 'stats'] as const,
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: dashboardService.getStats,
  });
};
