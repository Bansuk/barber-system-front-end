'use client';

import { AddEmployeeModal } from '@/components/employees/AddEmployeeModal';
import { CrudContent } from '@/components/shared/CrudContent';
import { EditEmployeeModal } from '@/components/employees/EditEmployeeModal';
import { Employee } from '@/types';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '@/hooks/useEmployees';

interface EmployeesContentProps {
  employees: Employee[];
}

export function EmployeeContent({ employees }: EmployeesContentProps) {
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  return (
    <CrudContent<Employee>
      title='Funcionários'
      buttonLabel='Novo Funcionário'
      items={employees}
      mutations={{
        create: createMutation,
        update: updateMutation,
        delete: deleteMutation,
      }}
      renderTable={(items, onEdit, onDelete) => (
        <EmployeeTable
          employees={items}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderAddModal={(isOpen, onClose, onSave) => (
        <AddEmployeeModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
        />
      )}
      renderEditModal={(isOpen, onClose, onSave, item) => (
        <EditEmployeeModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
          employee={item}
        />
      )}
      entityName='funcionário'
    />
  );
}