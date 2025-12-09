export interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export type CustomerData = Omit<Customer, 'id'>;