import React from 'react';

interface StatusConfig {
  bg: string;
  text: string;
  label: string;
}

export const commonStatusConfig: Record<string, StatusConfig> = {
  available: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disponível' },
  unavailable: { bg: 'bg-red-100', text: 'text-red-700', label: 'Indisponível' },
};

export const employeeStatusConfig: Record<string, StatusConfig> = {
  ...commonStatusConfig,
  vacation: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Férias' },
  sick_leave: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Licença Médica' },
};

export const renderStatusBadge = (status: string, config: Record<string, StatusConfig>) => {
  const statusStyle = config[status] || config.available;
  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}>
      {statusStyle.label}
    </span>
  );
};
