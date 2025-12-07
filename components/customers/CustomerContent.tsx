'use client';

import React, { useState, useTransition } from 'react';
import { Customer } from '@/types/customer';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { EditCustomerModal } from '@/components/customers/EditCustomerModal';
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal';
import { PageHeader } from '@/components/layout/PageHeader';
import { createCustomer, updateCustomer, deleteCustomer } from '@/app/(dashboard)/customers/actions';

interface CustomersContentProps {
  customers: Customer[];
}

export function CustomersContent({ customers }: CustomersContentProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAddCustomer = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveCustomer = async (customerData: Omit<Customer, 'id'>) => {
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      startTransition(async () => {
        const result = await createCustomer(customerData);
        
        if (result.success) {
          setIsAddModalOpen(false);
          setError(null);
        } else {
          setError(result.error || 'Failed to save customer');
        }
        
        resolve(result);
      });
    });
  };

  const handleEditCustomer = (customer: Customer) => {
    setCustomerToEdit(customer);
    setIsEditModalOpen(true);
  };

  const handleUpdateCustomer = async (id: number, customerData: Partial<Customer>) => {
    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      startTransition(async () => {
        const result = await updateCustomer(id, customerData);
        
        if (result.success) {
          setIsEditModalOpen(false);
          setCustomerToEdit(null);
          setError(null);
        } else {
          setError(result.error || 'Failed to update customer');
        }
        
        resolve(result);
      });
    });
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setCustomerToDelete(customer);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!customerToDelete) return;

    startTransition(async () => {        
      const result = await deleteCustomer(customerToDelete.id);
      
      if (!result.success) {
        setError(result.error || 'Failed to delete customer');
      } else {
        setError(null);
      }
      
      setIsDeleteModalOpen(false);
      setCustomerToDelete(null);
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCustomerToDelete(null);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <PageHeader 
        title="Clientes"
        action={
          <button
            onClick={handleAddCustomer}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Cliente
          </button>
        }
      />

        <CustomerTable
          customers={customers}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      
      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveCustomer}
      />
      
      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCustomerToEdit(null);
        }}
        onSave={handleUpdateCustomer}
        customer={customerToEdit}
      />
      
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        description={`Esta ação não pode ser desfeita. 
          Isso irá remover permanentemente o cliente ${customerToDelete?.name || ''} do sistema.`}
        isLoading={isPending}
        title={"Deletar Cliente"}
      />
    </>
  );
}