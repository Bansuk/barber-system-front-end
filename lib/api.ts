import { ApiError } from '@/types';

// Determine the API URL based on the environment
// For server-side (SSR), use the internal Docker service name if available
// For client-side (browser), always use localhost
const getApiUrl = () => {
  // Check if we're on the server side
  if (typeof window === 'undefined') {
    // Server-side: use internal Docker service name if in Docker, otherwise localhost
    return process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }
  // Client-side: always use the public URL (localhost)
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
};

const API_URL = getApiUrl();

const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `API Error: ${response.statusText}`;
  
  try {
    const errorData: ApiError = await response.json();
    
    if (errorData.errors?.json) {
      const errors = errorData.errors.json;
      const firstError = Object.values(errors)[0];
      if (firstError && firstError.length > 0) {
        errorMessage = firstError[0];
      }
    } else if (errorData.message) {
      errorMessage = errorData.message;
    }
  } catch (e) {
    throw(e);
  }
  
  throw new Error(errorMessage);
};

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) await handleApiError(response);

    return response.json();
  },

  post: async <T>(endpoint: string, data: T) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) await handleApiError(response);

    return response.json();
  },

  patch: async <T>(endpoint: string, data: T) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) await handleApiError(response);

    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) await handleApiError(response);
  },
};

export default api;