export interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  // serviceIds: number[];
}

export interface ApiEmployee {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  service_ids: number[];
}

export type ApiEmployeeData = {
  name?: string;
  email?: string;
  phone_number?: string;
  // service_ids?: number[];
};

export type EmployeeData = Omit<Employee, 'id'>;