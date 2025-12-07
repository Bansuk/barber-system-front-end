'use server';

import { revalidatePath } from 'next/cache';
import { customerService } from '@/services/customerService';
import { Customer } from '@/types/customer';

export async function createCustomer(customerData: Omit<Customer, 'id'>) {
  try {
    await customerService.create(customerData);
    revalidatePath('/customers');
    return { success: true };
  } catch (error) {
    console.error('Error creating customer:', error);
    return { success: false, error: 'Failed to create customer' };
  }
}

export async function deleteCustomer(id: number) {
  try {
    await customerService.delete(id);
    revalidatePath('/customers');
    return { success: true };
  } catch (error) {
    console.error('Error deleting customer:', error);
    return { success: false, error: 'Failed to delete customer' };
  }
}