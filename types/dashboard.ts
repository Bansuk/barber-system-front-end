export interface DashboardStats {
  totalCustomers: number;
  activeEmployees: number;
  availableServices: number;
  appointments: {
    total: number;
    past: number;
    upcoming: number;
  }
}