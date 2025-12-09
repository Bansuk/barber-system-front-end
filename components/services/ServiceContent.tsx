'use client';

import { AddServiceModal } from '@/components/services/AddServiceModal';
import { useCreateService, useUpdateService, useDeleteService } from '@/hooks/useServices';
import { CrudContent } from '@/components/shared/CrudContent';
import { EditServiceModal } from '@/components/services/EditServiceModal';
import { Service } from '@/types';
import { ServiceTable } from '@/components/services/ServiceTable';

interface ServiceContentProps {
  services: Service[];
}

export function ServiceContent({ services }: ServiceContentProps) {
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  return (
    <CrudContent<Service>
      title="Serviços"
      buttonLabel="Novo Serviço"
      items={services}
      mutations={{
        create: createMutation,
        update: updateMutation,
        delete: deleteMutation,
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