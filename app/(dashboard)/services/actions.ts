'use server';

import { serviceService } from '@/services/serviceService';
import { Service } from '@/types';
import { createCrudActions } from '@/lib/actions/createCrudActions';

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