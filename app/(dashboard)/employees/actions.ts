'use server';

import { createCrudActions } from '@/lib/actions/createCrudActions';
import { Employee } from '@/types';
import { employeeService } from '@/services/employeeService';

const { create, update, delete: deleteAction } = await createCrudActions<Employee>(
  employeeService,
  {
    entityName: 'employee',
    revalidatePaths: ['/employees', '/dashboard'],
  }
);

export const createEmployee = create;
export const updateEmployee = update;
export const deleteEmployee = deleteAction;