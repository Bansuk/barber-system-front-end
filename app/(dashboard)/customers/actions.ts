'use server';

import { revalidatePath } from 'next/cache';
import { customerService } from '@/services/customerService';
import { Customer } from '@/types/customer';

export async function createCustomer(customerData: Omit<Customer, 'id'>) {
  try {
    await customerService.create(customerData);
    revalidatePath('/customers');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error creating customer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create customer';
    return { success: false, error: errorMessage };
  }
}

export async function deleteCustomer(id: number) {
  try {
    await customerService.delete(id);
    revalidatePath('/customers');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting customer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete customer';
    return { success: false, error: errorMessage };
  }
}