'use client';

import React from 'react';
import { Service } from '@/types';
import { ServiceTable } from './ServiceTable';
import { AddServiceModal } from '@/components/services/AddServiceModal';
import { EditServiceModal } from '@/components/services/EditServiceModal';
import { CrudContent } from '@/components/shared/CrudContent';
import { createService, updateService, deleteService } from '@/app/(dashboard)/services/actions';

interface ServicesContentProps {
  services: Service[];
}

export function ServicesContent({ services }: ServicesContentProps) {
  return (
    <CrudContent<Service>
      title="Serviços"
      buttonLabel="Novo Serviço"
      items={services}
      actions={{
        create: createService,
        update: updateService,
        delete: deleteService,
      }}
      renderTable={(items, onEdit, onDelete) => (
        <ServiceTable
          services={items}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderAddModal={(isOpen, onClose, onSave) => (
        <AddServiceModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
        />
      )}
      renderEditModal={(isOpen, onClose, onSave, item) => (
        <EditServiceModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
          service={item}
        />
      )}
      deleteEntityName="serviço"
    />
  );
}