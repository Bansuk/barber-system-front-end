import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customerService } from '@/services/customerService';
import { Customer, CustomerData } from '@/types';

export const customerKeys = {
  all: ['customers'] as const,
  detail: (id: number) => ['customers', id] as const,
};

export const useCustomers = () => {
  return useQuery({
    queryKey: customerKeys.all,
    queryFn: customerService.getAll,
  });
};

export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => customerService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerData) => customerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Customer> }) =>
      customerService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(variables.id) });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => customerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
};
