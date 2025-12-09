import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';

// Query keys
export const dashboardKeys = {
  stats: ['dashboard', 'stats'] as const,
};

// Queries
export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: dashboardService.getStats,
  });
};
