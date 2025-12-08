'use server';

import { customerService } from '@/services/customerService';
import { Customer } from '@/types';
import { createCrudActions } from '@/lib/actions/createCrudActions';

const { create, update, delete: deleteAction } = await createCrudActions<Customer>(
  customerService,
  {
    entityName: 'customer',
    revalidatePaths: ['/customers', '/dashboard'],
  }
);

export const createCustomer = create;
export const updateCustomer = update;
export const deleteCustomer = deleteAction;