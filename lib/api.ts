const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
      url += `?${searchParams.toString()}`;
    }

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, params);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: any) =>
    api.post('/auth/register', data),

  logout: () =>
    api.post('/auth/logout'),

  getProfile: () =>
    api.get('/auth/profile'),
};

// Merchants API
export const merchantsApi = {
  getAll: () =>
    api.get('/merchants'),

  getById: (id: string) =>
    api.get(`/merchants/${id}`),

  create: (data: any) =>
    api.post('/merchants', data),

  update: (id: string, data: any) =>
    api.put(`/merchants/${id}`, data),

  delete: (id: string) =>
    api.delete(`/merchants/${id}`),
};

// Coupons API
export const couponsApi = {
  getAll: () =>
    api.get('/coupons'),

  getById: (id: string) =>
    api.get(`/coupons/${id}`),

  create: (data: any) =>
    api.post('/coupons', data),

  update: (id: string, data: any) =>
    api.put(`/coupons/${id}`, data),

  delete: (id: string) =>
    api.delete(`/coupons/${id}`),
};

// Redemptions API
export const redemptionsApi = {
  getAll: () =>
    api.get('/redemptions'),

  create: (data: any) =>
    api.post('/redemptions', data),
};

// Analytics API
export const analyticsApi = {
  getDashboard: () =>
    api.get('/analytics/dashboard'),

  getRevenue: (params?: any) =>
    api.get('/analytics/revenue', params),
};
