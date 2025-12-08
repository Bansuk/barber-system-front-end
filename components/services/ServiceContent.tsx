'use client';

import React, { useState, useTransition } from 'react';
import { Service } from '@/types/service';
import { ServiceTable } from './ServiceTable';
import { AddServiceModal } from '@/components/services/AddServiceModal';
import { EditServiceModal } from '@/components/services/EditServiceModal';
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal';
import { PageHeader } from '@/components/layout/PageHeader';
import { createService, updateService, deleteService } from '@/app/(dashboard)/services/actions';

interface ServicesContentProps {
  services: Service[];
}

export function ServicesContent({ services }: ServicesContentProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAddService = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveService = async (serviceData: Omit<Service, 'id'>) => {
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      startTransition(async () => {
        const result = await createService(serviceData);
        
        if (result.success) {
          setIsAddModalOpen(false);
          setError(null);
        } else {
          setError(result.error || 'Failed to save service');
        }
        
        resolve(result);
      });
    });
  };

  const handleEditService = (service: Service) => {
    setServiceToEdit(service);
    setIsEditModalOpen(true);
  };

  const handleUpdateService = async (id: number, serviceData: Partial<Service>) => {
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      startTransition(async () => {
        const result = await updateService(id, serviceData);
        
        if (result.success) {
          setIsEditModalOpen(false);
          setServiceToEdit(null);
          setError(null);
        } else {
          setError(result.error || 'Failed to update service');
        }
        
        resolve(result);
      });
    });
  };

  const handleDeleteService = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;

    startTransition(async () => {        
      const result = await deleteService(serviceToDelete.id);
      
      if (!result.success) {
        setError(result.error || 'Failed to delete service');
      } else {
        setError(null);
      }
      
      setIsDeleteModalOpen(false);
      setServiceToDelete(null);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setServiceToDelete(null);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <PageHeader 
        title="Serviços"
        action={
          <button
            onClick={handleAddService}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Serviço
          </button>
        }
      />

        <ServiceTable
          services={services}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
        />
      
      <AddServiceModal 
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveService}
      />
      
      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setServiceToEdit(null);
        }}
        onSave={handleUpdateService}
        service={serviceToEdit}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        description={`Esta ação não pode ser desfeita. 
          Isso irá remover permanentemente o serviço ${serviceToDelete?.name || ''} do sistema.`}
        isLoading={isPending}
        title={"Deletar Serviço"}
      />
    </>
  );
}