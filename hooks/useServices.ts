import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serviceService } from '@/services/serviceService';
import { Service, ServiceData } from '@/types';

// Query keys
export const serviceKeys = {
  all: ['services'] as const,
  detail: (id: number) => ['services', id] as const,
};

// Queries
export const useServices = () => {
  return useQuery({
    queryKey: serviceKeys.all,
    queryFn: serviceService.getAll,
  });
};

export const useService = (id: number) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => serviceService.getById(id),
    enabled: !!id,
  });
};

// Mutations
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ServiceData) => serviceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Service> }) =>
      serviceService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      queryClient.invalidateQueries({ queryKey: serviceKeys.detail(variables.id) });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => serviceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
    },
  });
};
