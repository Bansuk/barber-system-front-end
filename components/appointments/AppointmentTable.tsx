import React from 'react';
import { Appointment, Column } from '@/types';
import { DataTable } from '@/components/shared/DataTable';

interface AppointmentTableProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}

const appointmentColumns: Column<Appointment>[] = [];

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  onEdit,
  onDelete
}) => {
  return (
    <DataTable
      items={appointments}
      columns={appointmentColumns}
      onEdit={onEdit}
      onDelete={onDelete}
      editAriaLabel='Edit appointment'
      deleteAriaLabel='Delete appointment'
    />
  );
};