export interface Service {
  id: number;
  name: string;
  price: number;
}

export type ServiceData = Omit<Service, 'id'>;