'use server';

import { revalidatePath } from 'next/cache';
import { serviceService } from '@/services/serviceService';
import { Service } from '@/types/service';

export async function createService(serviceData: Omit<Service, 'id'>) {
  try {
    await serviceService.create(serviceData);
    revalidatePath('/services');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error creating Service:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create Service';
    return { success: false, error: errorMessage };
  }
}

export async function updateService(id: number, serviceData: Partial<Service>) {
  try {
    await serviceService.update(id, serviceData);
    revalidatePath('/services');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating Service:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update Service';
    return { success: false, error: errorMessage };
  }
}

export async function deleteService(id: number) {
  try {
    await serviceService.delete(id);
    revalidatePath('/services');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting Service:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete Service';
    return { success: false, error: errorMessage };
  }
}