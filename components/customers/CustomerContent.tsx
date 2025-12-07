'use client';

import React, { useState, useTransition } from 'react';
import { Customer } from '@/types/customer';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { PageHeader } from '@/components/layout/PageHeader';
import { createCustomer, deleteCustomer } from '@/app/(dashboard)/customers/actions';

interface CustomersContentProps {
  customers: Customer[];
}

export function CustomersContent({ customers }: CustomersContentProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAddCustomer = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveCustomer = async (customerData: Omit<Customer, 'id'>) => {
    startTransition(async () => {
      const result = await createCustomer(customerData);
      
      if (result.success) {
        setIsAddModalOpen(false);
        setError(null);
      } else {
        setError(result.error || 'Failed to save customer');
      }
    });
  };

  const handleEditCustomer = (customer: Customer) => {
    console.log('Edit customer:', customer);
    setIsAddModalOpen(true);
  };

  const handleDeleteCustomer = async (customer: Customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${customer.name}?`
    );
    
    if (confirmed) {
      startTransition(async () => {        
        const result = await deleteCustomer(customer.id);
        
        if (!result.success) {
          setError(result.error || 'Failed to delete customer');
        } else {
          setError(null);
        }
      });
    }
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {isPending && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800">Updating...</p>
          </div>
        )}

        <CustomerTable
          customers={customers}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      </div>
      
      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveCustomer}
      />
    </>
  );
}