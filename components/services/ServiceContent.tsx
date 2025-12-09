'use client';

import { AddServiceModal } from '@/components/services/AddServiceModal';
import { createService, updateService, deleteService } from '@/app/(dashboard)/services/actions';
import { CrudContent } from '@/components/shared/CrudContent';
import { EditServiceModal } from '@/components/services/EditServiceModal';
import { Service } from '@/types';
import { ServiceTable } from '@/components/services/ServiceTable';

interface ServiceContentProps {
  services: Service[];
}

export function ServiceContent({ services }: ServiceContentProps) {
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
      entityName="serviço"
    />
  );
}