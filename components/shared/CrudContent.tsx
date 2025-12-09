'use client';

import { useState, ReactNode } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal';
import { PageHeader } from '@/components/layout/PageHeader';
import { SaveResult } from '@/types';

interface CrudMutations<T> {
  create: UseMutationResult<T, Error, Omit<T, 'id'>, unknown>;
  update: UseMutationResult<T, Error, { id: number; data: Partial<T> }, unknown>;
  delete: UseMutationResult<void, Error, number, unknown>;
}

interface CrudContentProps<T extends { id: number; name: string }> {
  mutations: CrudMutations<T>;
  buttonLabel: string;
  entityName: string;
  items: T[];
  renderAddModal: (isOpen: boolean, onClose: () => void, onSave: (data: Omit<T, 'id'>) => Promise<SaveResult>) => ReactNode;
  renderEditModal: (isOpen: boolean, onClose: () => void, onSave: (id: number, data: Partial<T>) => Promise<SaveResult>, item: T | null) => ReactNode;
  renderTable: (items: T[], onEdit: (item: T) => void, onDelete: (item: T) => void) => ReactNode;
  title: string;
}

export function CrudContent<T extends { id: number; name: string }>({
  mutations,
  buttonLabel,
  entityName,
  items,
  renderAddModal,
  renderEditModal,
  renderTable,
  title,
}: CrudContentProps<T>) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [itemToEdit, setItemToEdit] = useState<T | null>(null);

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleSave = async (data: Omit<T, 'id'>): Promise<SaveResult> => {
    try {
      await mutations.create.mutateAsync(data);
      setIsAddModalOpen(false);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar';
      return { success: false, error: errorMessage };
    }
  };

  const handleEdit = (item: T) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (id: number, data: Partial<T>): Promise<SaveResult> => {
    try {
      await mutations.update.mutateAsync({ id, data });
      setIsEditModalOpen(false);
      setItemToEdit(null);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar';
      return { success: false, error: errorMessage };
    }
  };

  const handleDelete = (item: T) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await mutations.delete.mutateAsync(itemToDelete.id);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const isPending = mutations.create.isPending || mutations.update.isPending || mutations.delete.isPending;

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
          Isso irá remover permanentemente o ${entityName} ${itemToDelete?.name || ''} do sistema.`}
        isLoading={isPending}
        title={`Deletar ${entityName}`}
      />
    </>
  );
}
