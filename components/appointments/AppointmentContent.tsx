'use client';

import { AddAppointmentModal } from '@/components/appointments/AddAppointmentModal';
import { CrudContent } from '@/components/shared/CrudContent';
import { Appointment } from '@/types';
import { AppointmentTable } from '@/components/appointments/AppointmentTable';
import { EditAppointmentModal } from '@/components/appointments/EditAppointmentModal';
import { useCreateAppointment, useUpdateAppointment, useDeleteAppointment } from '@/hooks/useAppointments';
import { useCustomers } from '@/hooks/useCustomers';
import { useEmployees } from '@/hooks/useEmployees';
import { useServices } from '@/hooks/useServices';

interface AppointmentContentProps {
  appointments: Appointment[];
}

export function AppointmentContent({ appointments }: AppointmentContentProps) {
  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment();
  const deleteMutation = useDeleteAppointment();
  const { data: customers = [] } = useCustomers();
  const { data: employees = [] } = useEmployees();
  const { data: services = [] } = useServices();

  return (
    <CrudContent<Appointment>
      title='Agendamentos'
      buttonLabel='Novo Agendamento'
      items={appointments}
      mutations={{
        create: createMutation,
        update: updateMutation,
        delete: deleteMutation,
      }}
      renderTable={(items, onEdit, onDelete) => (
        <AppointmentTable
          appointments={items}
          customers={customers}
          employees={employees}
          services={services}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      renderAddModal={(isOpen, onClose, onSave) => (
        <AddAppointmentModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
        />
      )}
      renderEditModal={(isOpen, onClose, onSave, item) => (
        <EditAppointmentModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
          appointment={item}
        />
      )}
      entityName='agendamento'
    />
  );
}