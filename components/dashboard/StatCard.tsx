import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBgColor: string;
  valueColor?: string;
  subtitle?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  valueColor = 'text-blue-600',
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className={`${iconBgColor} rounded-lg p-3 flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
          {subtitle && <div className="mt-2">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
};