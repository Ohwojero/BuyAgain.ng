import { Redemption, Referral, TeamMember } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://buyagainbackend-production.up.railway.app');
console.log('API_BASE_URL:', API_BASE_URL);

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

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // If not JSON, return the text as error
        const text = await response.text();
        console.error('Non-JSON response:', text);
        return {
          success: false,
          error: `Server returned non-JSON response: ${text.substring(0, 200)}...`,
        };
      }

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

  generate: (data: any) =>
    api.post('/coupons/generate', data),

  update: (id: string, data: any) =>
    api.put(`/coupons/${id}`, data),

  delete: (id: string) =>
    api.delete(`/coupons/${id}`),
};

// Redemptions API
export const redemptionsApi = {
  getAll: (): Promise<ApiResponse<Redemption[]>> =>
    api.get('/redemptions'),

  redeem: (data: any) =>
    api.post('/redemptions/redeem', data),
};

// Analytics API
export const analyticsApi = {
  getDashboard: () =>
    api.get('/analytics/dashboard'),

  getRevenue: (params?: any) =>
    api.get('/analytics/revenue', params),

  getAnalytics: () =>
    api.get('/analytics'),

  getRedemptionTrends: () =>
    api.get('/analytics/redemption-trends'),
};

// Admin API
export const adminApi = {
  getOverview: () =>
    api.get('/admin/overview'),
};

// Customers API
export const customersApi = {
  create: (data: any) =>
    api.post('/customers', data),

  getAll: () =>
    api.get('/customers'),

  getById: (id: string) =>
    api.get(`/customers/${id}`),

  update: (id: string, data: any) =>
    api.put(`/customers/${id}`, data),

  delete: (id: string) =>
    api.delete(`/customers/${id}`),
};

// Team Members API
export const teammembersApi = {
  create: (data: any) =>
    api.post('/teammembers', data),

  getAll: (): Promise<ApiResponse<TeamMember[]>> =>
    api.get('/teammembers'),

  getById: (id: string) =>
    api.get(`/teammembers/${id}`),

  update: (id: string, data: any) =>
    api.put(`/teammembers/${id}`, data),

  delete: (id: string) =>
    api.delete(`/teammembers/${id}`),
};

// Audit Logs API
export const auditlogsApi = {
  getAll: (params?: any) =>
    api.get('/auditlogs', params),

  getById: (id: string) =>
    api.get(`/auditlogs/${id}`),
};

// Referrals API
export const referralsApi = {
  create: (data: any) =>
    api.post('/referrals', data),

  getAll: (): Promise<ApiResponse<Referral[]>> =>
    api.get('/referrals'),
};
