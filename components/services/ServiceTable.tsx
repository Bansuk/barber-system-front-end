import React from 'react';
import { DataTable } from '@/components/shared/DataTable';
import { priceMask } from '@/lib/utils/priceMask';
import { Service, Column } from '@/types';
import { commonStatusConfig, renderStatusBadge } from '@/lib/utils/statusConfig';

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const serviceColumns: Column<Service>[] = [
  {
    key: 'name',
    label: 'Nome',
    render: (service) => (
      <div className='flex items-center gap-3'>
        <div>
          <div className='font-medium text-gray-900'>{service.name}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'price',
    label: 'Preço',
    render: (service) => priceMask(service.price),
  },
  {
    key: 'status',
    label: 'Situação',
    render: (service) => renderStatusBadge(service.status, commonStatusConfig),
  },
];

export const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onEdit,
  onDelete
}) => {
  return (
    <DataTable
      items={services}
      columns={serviceColumns}
      onEdit={onEdit}
      onDelete={onDelete}
      editAriaLabel='Edit service'
      deleteAriaLabel='Delete service'
    />
  );
};