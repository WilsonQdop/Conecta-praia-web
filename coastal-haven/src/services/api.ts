// src/services/api.ts
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Ajuste conforme sua URL do backend

// Criar instância do axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT nas requisições
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ═══════════════════════════════════════════════════════════════
// 🔐 AUTH SERVICES
// ═══════════════════════════════════════════════════════════════

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  token: string;
  role: 'TURISTA' | 'EMPREENDEDOR' | 'ADMIN';
}

export interface RegisterRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  role: 'TURISTA' | 'EMPREENDEDOR' | 'ADMIN';
}

export interface RegisterResponse {
  name: string;
  email: string;
  role: 'TURISTA' | 'EMPREENDEDOR' | 'ADMIN';
}

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Armazenar token no localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.name);
      }
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  // Register
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  },

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  },
};

// ═══════════════════════════════════════════════════════════════
// 📝 POST EVENT SERVICES (EMPREENDEDOR)
// ═══════════════════════════════════════════════════════════════

export interface CreateEventRequest {
  title: string;
  eventType: 'SURF' | 'MUSICA' | 'TRILHA' | 'GERAL'; // Ajuste conforme seus tipos
  location: string;
  value: number; // BigDecimal convertido para number
  valueDescription: string;
  imageUrl?: string;
  description: string;
}

export interface CreateEventResponse {
  title: string;
  eventType: string;
  location: string;
  value: number;
  valueDescription: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
  dateHour: string;
}

export const eventService = {
  async createEvent(eventData: CreateEventRequest): Promise<CreateEventResponse> {
    try {
      const response = await apiClient.post<CreateEventResponse>(
        '/postEvent/create',
        eventData
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  },
};

// ═══════════════════════════════════════════════════════════════
// 🏪 POST SERVICE SERVICES (EMPREENDEDOR)
// ═══════════════════════════════════════════════════════════════

export interface CreateServiceRequest {
  title: string;
  serviceType: 'RESTAURANTE' | 'BAR' | 'AUTONOMO' | 'GERAL'; // Ajuste conforme seus tipos
  location: string;
  value: number;
  valueDescription: string;
  imageUrl?: string;
  description: string;
}

export interface CreateServiceResponse {
  title: string;
  serviceType: string;
  location: string;
  value: number;
  valueDescription: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
  dateHour: string;
}

export const serviceService = {
  async createService(serviceData: CreateServiceRequest): Promise<CreateServiceResponse> {
    try {
      const response = await apiClient.post<CreateServiceResponse>(
        '/postService/create',
        serviceData
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      throw error;
    }
  },
};

// ═══════════════════════════════════════════════════════════════
// ⭐ REVIEW SERVICES (TURISTA)
// ═══════════════════════════════════════════════════════════════

export interface ReviewRequest {
  rating: number; // 1-5
  comment: string;
}

export const reviewService = {
  async reviewService(serviceId: string, reviewData: ReviewRequest): Promise<void> {
    try {
      await apiClient.post(`/reviews/services/${serviceId}`, reviewData);
    } catch (error) {
      console.error('Erro ao avaliar serviço:', error);
      throw error;
    }
  },

  async reviewEvent(eventId: string, reviewData: ReviewRequest): Promise<void> {
    try {
      await apiClient.post(`/reviews/events/${eventId}`, reviewData);
    } catch (error) {
      console.error('Erro ao avaliar evento:', error);
      throw error;
    }
  },

  async reviewProvider(providerId: string, reviewData: ReviewRequest): Promise<void> {
    try {
      await apiClient.post(`/reviews/providers/${providerId}`, reviewData);
    } catch (error) {
      console.error('Erro ao avaliar provedor:', error);
      throw error;
    }
  },

  async reviewEntrepreneur(entrepreneurId: string, reviewData: ReviewRequest): Promise<void> {
    try {
      await apiClient.post(`/reviews/entrepreneurs/${entrepreneurId}`, reviewData);
    } catch (error) {
      console.error('Erro ao avaliar empreendedor:', error);
      throw error;
    }
  },
};

// ═══════════════════════════════════════════════════════════════
// 🎫 SUBSCRIPTION SERVICES (TURISTA)
// ═══════════════════════════════════════════════════════════════

export interface SubscribeResponse {
  name: string;
  title: string;
}

export const subscriptionService = {
  async subscribeToService(serviceId: string): Promise<SubscribeResponse> {
    try {
      const response = await apiClient.post<SubscribeResponse>(
        `/subscriptions/services/${serviceId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao se inscrever no serviço:', error);
      throw error;
    }
  },

  async subscribeToEvent(eventId: string): Promise<SubscribeResponse> {
    try {
      const response = await apiClient.post<SubscribeResponse>(
        `/subscriptions/events/${eventId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao se inscrever no evento:', error);
      throw error;
    }
  },
};

// ═══════════════════════════════════════════════════════════════
// 📤 FILE UPLOAD SERVICES (EMPREENDEDOR)
// ═══════════════════════════════════════════════════════════════

export const uploadService = {
  async uploadImage(postId: string, file: File): Promise<{ imageUrl: string }> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiClient.post<{ imageUrl: string }>(
        `/upload/upload/${postId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  },
};

export default apiClient;