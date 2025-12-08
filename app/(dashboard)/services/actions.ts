'use server';

import { createCrudActions } from '@/lib/actions/createCrudActions';
import { Service } from '@/types';
import { serviceService } from '@/services/serviceService';

const { create, update, delete: deleteAction } = await createCrudActions<Service>(
  serviceService,
  {
    entityName: 'service',
    revalidatePaths: ['/services', '/dashboard'],
  }
);

export const createService = create;
export const updateService = update;
export const deleteService = deleteAction;