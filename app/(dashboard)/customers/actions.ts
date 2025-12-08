'use server';

import { createCrudActions } from '@/lib/actions/createCrudActions';
import { Customer } from '@/types';
import { customerService } from '@/services/customerService';

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