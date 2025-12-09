# React Query Implementation Guide

This project uses **TanStack Query (React Query)** for efficient server state management.

## Overview

React Query has been implemented with the following structure:

### Setup

1. **QueryProvider** (`/providers/QueryProvider.tsx`)
   - Wraps the application with `QueryClientProvider`
   - Configures default options (1-minute stale time, disabled window refocus refetching)
   - Includes React Query DevTools for development

2. **Layout Integration** (`/app/layout.tsx`)
   - QueryProvider wraps the entire app
   - Order: QueryProvider → ToastProvider → children

## Custom Hooks

Each entity has its own set of hooks in the `/hooks` directory:

### Customers (`/hooks/useCustomers.ts`)
- `useCustomers()` - Fetch all customers
- `useCustomer(id)` - Fetch single customer
- `useCreateCustomer()` - Create customer mutation
- `useUpdateCustomer()` - Update customer mutation
- `useDeleteCustomer()` - Delete customer mutation

### Employees (`/hooks/useEmployees.ts`)
- `useEmployees()` - Fetch all employees
- `useEmployee(id)` - Fetch single employee
- `useCreateEmployee()` - Create employee mutation
- `useUpdateEmployee()` - Update employee mutation
- `useDeleteEmployee()` - Delete employee mutation

### Services (`/hooks/useServices.ts`)
- `useServices()` - Fetch all services
- `useService(id)` - Fetch single service
- `useCreateService()` - Create service mutation
- `useUpdateService()` - Update service mutation
- `useDeleteService()` - Delete service mutation

### Dashboard (`/hooks/useDashboard.ts`)
- `useDashboardStats()` - Fetch dashboard statistics

## Usage Examples

### Fetching Data

```tsx
'use client';

import { useCustomers } from '@/hooks/useCustomers';

export default function CustomersPage() {
  const { data: customers = [], isLoading, error } = useCustomers();

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {customers.map(customer => (
        <div key={customer.id}>{customer.name}</div>
      ))}
    </div>
  );
}
```

### Creating Data

```tsx
import { useCreateCustomer } from '@/hooks/useCustomers';
import { useToast } from '@/contexts/ToastContext';

export function CreateCustomerForm() {
  const { mutate, isPending } = useCreateCustomer();
  const { showToast } = useToast();

  const handleSubmit = (data: CustomerData) => {
    mutate(data, {
      onSuccess: () => {
        showToast('Cliente criado com sucesso!', 'success');
      },
      onError: (error) => {
        showToast(error.message, 'error');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Criando...' : 'Criar Cliente'}
      </button>
    </form>
  );
}
```

### Updating Data

```tsx
import { useUpdateCustomer } from '@/hooks/useCustomers';

export function EditCustomerForm({ customerId }: { customerId: number }) {
  const { mutate, isPending } = useUpdateCustomer();

  const handleSubmit = (data: Partial<Customer>) => {
    mutate({ id: customerId, data }, {
      onSuccess: () => {
        // Handle success
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Deleting Data

```tsx
import { useDeleteCustomer } from '@/hooks/useCustomers';

export function DeleteCustomerButton({ customerId }: { customerId: number }) {
  const { mutate, isPending } = useDeleteCustomer();

  const handleDelete = () => {
    if (confirm('Tem certeza?')) {
      mutate(customerId, {
        onSuccess: () => {
          // Handle success
        },
      });
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? 'Deletando...' : 'Deletar'}
    </button>
  );
}
```

## Query Keys

Each hook module exports query keys for consistency:

```tsx
import { customerKeys } from '@/hooks/useCustomers';

// Use in manual invalidation
queryClient.invalidateQueries({ queryKey: customerKeys.all });
queryClient.invalidateQueries({ queryKey: customerKeys.detail(id) });
```

## Features

- ✅ Automatic background refetching
- ✅ Request deduplication
- ✅ Optimistic UI updates via cache invalidation
- ✅ Loading and error states
- ✅ DevTools for debugging (development only)
- ✅ 1-minute stale time to reduce unnecessary refetches
- ✅ Window focus refetching disabled

## Configuration

Default options in `QueryProvider.tsx`:

```tsx
{
  queries: {
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
    retry: 1,
  },
}
```

## Best Practices

1. **Always handle loading and error states** in components
2. **Use query keys consistently** for cache invalidation
3. **Leverage onSuccess/onError callbacks** in mutations for side effects
4. **Keep query keys exported** from hook files for reusability
5. **Use the DevTools** during development to inspect cache state

## DevTools

Press the React Query icon in the bottom corner of your browser to open the DevTools panel. This allows you to:
- Inspect query cache
- View query status
- Manually refetch queries
- Debug stale/fresh states

## Migration from Server Components

Pages have been converted from Server Components to Client Components:
- Removed `async` from page components
- Added `'use client'` directive
- Replaced direct service calls with React Query hooks
- Added loading and error state handling
