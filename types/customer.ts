export interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ApiCustomer {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

export type ApiCustomerData = {
  name?: string;
  email?: string;
  phone_number?: string;
};

export type CustomerData = Omit<Customer, 'id'>;