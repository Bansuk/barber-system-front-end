import React from 'react';
import { Service } from '@/types';
import { priceMask } from '@/lib/utils/priceMask';
import { DataTable, Column } from '@/components/shared/DataTable';

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
      <div className="flex items-center gap-3">
        <div>
          <div className="font-medium text-gray-900">{service.name}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'price',
    label: 'Preço',
    render: (service) => priceMask(service.price),
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
      editAriaLabel="Edit service"
      deleteAriaLabel="Delete service"
    />
  );
};