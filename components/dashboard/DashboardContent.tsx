'use client';

import { DashboardStats } from '@/types';
import { StatCard } from '@/components/dashboard/StatCard';

interface DashboardContentProps {
  stats: DashboardStats;
}

export function DashboardContent({ stats }: DashboardContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Clientes"
          value={stats?.totalCustomers || 0}
          valueColor="text-blue-600"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          iconBgColor="bg-blue-100"
        />

        <StatCard
          title="Funcionários Disponíveis"
          value={stats?.activeEmployees || 0}
          valueColor="text-green-600"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          iconBgColor="bg-green-100"
        />

        <StatCard
          title="Serviços Disponíveis"
          value={stats?.availableServices || 0}
          valueColor="text-purple-600"
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
          }
          iconBgColor="bg-purple-100"
        />

        <StatCard
          title="Agendamentos"
          value={stats?.appointments?.total || 0}
          valueColor="text-orange-600"
          icon={
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          iconBgColor="bg-orange-100"
          subtitle={
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-gray-500">Próximos</p>
                <p className="font-semibold text-gray-900">{stats?.appointments?.upcoming || 0}</p>
              </div>
              <div>
                <p className="text-gray-500">Anteriores</p>
                <p className="font-semibold text-gray-900">{stats?.appointments?.past || 0}</p>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}