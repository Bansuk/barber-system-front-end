import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  subtitle?: React.ReactNode;
  title: string;
  value: number | string;
  valueColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBgColor,
  subtitle,
  title,
  value,
  valueColor = 'text-blue-600',
}) => {
  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <div className='flex items-start gap-4'>
        <div className={`${iconBgColor} rounded-lg p-3 flex-shrink-0`}>
          {icon}
        </div>
        <div className='flex-1'>
          <p className='text-sm text-gray-600 mb-1'>{title}</p>
          <p className={`text-4xl font-bold ${valueColor}`}>{value}</p>
          {subtitle && <div className='mt-2'>{subtitle}</div>}
        </div>
      </div>
    </div>
  );
};