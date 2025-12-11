export interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  serviceIds: number[];
}

export interface ApiEmployee {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  status: string;
  service_ids: number[];
}

export type ApiEmployeeData = {
  name?: string;
  email?: string;
  phone_number?: string;
  status?: string;
  service_ids?: number[];
};

export type EmployeeData = Omit<Employee, 'id'>;