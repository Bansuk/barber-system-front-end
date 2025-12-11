export interface Service {
  id: number;
  name: string;
  price: number;
  status: string;
}

export type ServiceData = Omit<Service, 'id'>;