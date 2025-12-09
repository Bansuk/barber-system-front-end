import React from 'react';

interface PageHeaderProps {
  action?: React.ReactNode;
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ action, title }) => {
  return (
    <div>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
    </div>
  );
};