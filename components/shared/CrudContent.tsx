'use client';

import React, { useState, useTransition, ReactNode } from 'react';
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal';
import { PageHeader } from '@/components/layout/PageHeader';

interface CrudActions<T> {
  create: (data: Omit<T, 'id'>) => Promise<{ success: boolean; error?: string }>;
  update: (id: number, data: Partial<T>) => Promise<{ success: boolean; error?: string }>;
  delete: (id: number) => Promise<{ success: boolean; error?: string }>;
}

interface CrudContentProps<T extends { id: number; name: string }> {
  title: string;
  buttonLabel: string;
  items: T[];
  actions: CrudActions<T>;
  renderTable: (items: T[], onEdit: (item: T) => void, onDelete: (item: T) => void) => ReactNode;
  renderAddModal: (isOpen: boolean, onClose: () => void, onSave: (data: Omit<T, 'id'>) => Promise<{ success: boolean; error?: string }>) => ReactNode;
  renderEditModal: (isOpen: boolean, onClose: () => void, onSave: (id: number, data: Partial<T>) => Promise<{ success: boolean; error?: string }>, item: T | null) => ReactNode;
  deleteEntityName: string;
}

export function CrudContent<T extends { id: number; name: string }>({
  title,
  buttonLabel,
  items,
  actions,
  renderTable,
  renderAddModal,
  renderEditModal,
  deleteEntityName,
}: CrudContentProps<T>) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<T | null>(null);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleSave = async (data: Omit<T, 'id'>) => {
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      startTransition(async () => {
        const result = await actions.create(data);
        
        if (result.success) {
          setIsAddModalOpen(false);
          setError(null);
        } else {
          setError(result.error || `Failed to save ${deleteEntityName}`);
        }
        
        resolve(result);
      });
    });
  };

  const handleEdit = (item: T) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (id: number, data: Partial<T>) => {
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      startTransition(async () => {
        const result = await actions.update(id, data);
        
        if (result.success) {
          setIsEditModalOpen(false);
          setItemToEdit(null);
          setError(null);
        } else {
          setError(result.error || `Failed to update ${deleteEntityName}`);
        }
        
        resolve(result);
      });
    });
  };

  const handleDelete = (item: T) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    startTransition(async () => {        
      const result = await actions.delete(itemToDelete.id);
      
      if (!result.success) {
        setError(result.error || `Failed to delete ${deleteEntityName}`);
      } else {
        setError(null);
      }
      
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <PageHeader 
        title={title}
        action={
          <button
            onClick={handleAdd}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {buttonLabel}
          </button>
        }
      />

      {renderTable(items, handleEdit, handleDelete)}
      
      {renderAddModal(isAddModalOpen, handleModalClose, handleSave)}
      
      {renderEditModal(
        isEditModalOpen,
        () => {
          setIsEditModalOpen(false);
          setItemToEdit(null);
        },
        handleUpdate,
        itemToEdit
      )}
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        description={`Esta ação não pode ser desfeita. 
          Isso irá remover permanentemente o ${deleteEntityName} ${itemToDelete?.name || ''} do sistema.`}
        isLoading={isPending}
        title={`Deletar ${deleteEntityName}`}
      />
    </>
  );
}
