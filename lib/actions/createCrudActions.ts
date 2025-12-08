'use server';

import { revalidatePath } from 'next/cache';

interface CrudService<T> {
  create: (data: Omit<T, 'id'>) => Promise<T>;
  update: (id: number, data: Partial<T>) => Promise<T>;
  delete: (id: number) => Promise<void>;
}

interface CrudActionsConfig {
  entityName: string;
  revalidatePaths: string[];
}

export async function createCrudActions<T extends { id: number }>(
  service: CrudService<T>,
  config: CrudActionsConfig
) {
  const { entityName, revalidatePaths } = config;

  async function create(data: Omit<T, 'id'>) {
    try {
      await service.create(data);
      revalidatePaths.forEach((path) => revalidatePath(path));
      return { success: true };
    } catch (error) {
      console.error(`Error creating ${entityName}:`, error);
      const errorMessage = error instanceof Error ? error.message : `Failed to create ${entityName}`;
      return { success: false, error: errorMessage };
    }
  }

  async function update(id: number, data: Partial<T>) {
    try {
      await service.update(id, data);
      revalidatePaths.forEach((path) => revalidatePath(path));
      return { success: true };
    } catch (error) {
      console.error(`Error updating ${entityName}:`, error);
      const errorMessage = error instanceof Error ? error.message : `Failed to update ${entityName}`;
      return { success: false, error: errorMessage };
    }
  }

  async function deleteAction(id: number) {
    try {
      await service.delete(id);
      revalidatePaths.forEach((path) => revalidatePath(path));
      return { success: true };
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
      const errorMessage = error instanceof Error ? error.message : `Failed to delete ${entityName}`;
      return { success: false, error: errorMessage };
    }
  }

  return {
    create,
    update,
    delete: deleteAction,
  };
}
