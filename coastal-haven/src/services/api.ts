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
  console.log('[INTERCEPTOR] URL:', config.url);
  console.log('[INTERCEPTOR] Token existe?', !!token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[INTERCEPTOR] Authorization header setado');
  } else {
    console.log('[INTERCEPTOR] ⚠️ NENHUM TOKEN ENCONTRADO!');
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

// src/services/api.ts - ADICIONAR estas interfaces e methods

// ═══════════════════════════════════════════════════════════════════════
// 📋 INTERFACES (DTOs)
// ═══════════════════════════════════════════════════════════════════════

export interface PostServiceResponseDTO {
  id: string;
  title: string;
  serviceType: string;
  location: string;
  value: number;
  valueDescription: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
  dateHour: string;
  entrepreneurName: string;
  entrepreneurId: string;
}

export interface PostEventResponseDTO {
  id: string;
  title: string;
  eventType: string;
  location: string;
  value: number;
  valueDescription: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
  dateHour: string;
  entrepreneurName: string;
  entrepreneurId: string;
}

// ═══════════════════════════════════════════════════════════════════════
// 🔽 SERVICES
// ═══════════════════════════════════════════════════════════════════════

export const postServiceService = {
  /**
   * Meus serviços (do empreendedor logado)
   */
  async getMyServices(): Promise<PostServiceResponseDTO[]> {
    try {
      console.log('[API] GET /postService/my-services');
      const response = await apiClient.get<PostServiceResponseDTO[]>(
        '/postService/my-services'
      );
      console.log('[API] ✅ Encontrados ' + response.data.length + ' serviços');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar meus serviços:', error);
      throw error;
    }
  },

  /**
   * Todos os serviços (de todos os empreendedores)
   */
  async getAllServices(): Promise<PostServiceResponseDTO[]> {
    try {
      console.log('[API] GET /postService/all-services');
      const response = await apiClient.get<PostServiceResponseDTO[]>(
        '/postService/all-services'
      );
      console.log('[API] ✅ Total de serviços: ' + response.data.length);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }
  },

  /**
   * Serviços por tipo (RESTAURANTE, BAR, AUTONOMO, GERAL)
   */
  async getServicesByType(serviceType: string): Promise<PostServiceResponseDTO[]> {
    try {
      console.log('[API] GET /postService/services-by-type/' + serviceType);
      const response = await apiClient.get<PostServiceResponseDTO[]>(
        `/postService/services-by-type/${serviceType}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços por tipo:', error);
      throw error;
    }
  },

  /**
   * Serviços por localização
   */
  async getServicesByLocation(location: string): Promise<PostServiceResponseDTO[]> {
    try {
      console.log('[API] GET /postService/services-by-location?location=' + location);
      const response = await apiClient.get<PostServiceResponseDTO[]>(
        '/postService/services-by-location',
        { params: { location } }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços por localização:', error);
      throw error;
    }
  },
};

export const postEventService = {
  /**
   * Meus eventos (do empreendedor logado)
   */
  async getMyEvents(): Promise<PostEventResponseDTO[]> {
    try {
      console.log('[API] GET /postEvent/my-events');
      const response = await apiClient.get<PostEventResponseDTO[]>(
        '/postEvent/my-events'
      );
      console.log('[API] ✅ Encontrados ' + response.data.length + ' eventos');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar meus eventos:', error);
      throw error;
    }
  },

  /**
   * Todos os eventos (de todos os empreendedores)
   */
  async getAllEvents(): Promise<PostEventResponseDTO[]> {
    try {
      console.log('[API] GET /postEvent/all-events');
      const response = await apiClient.get<PostEventResponseDTO[]>(
        '/postEvent/all-events'
      );
      console.log('[API] ✅ Total de eventos: ' + response.data.length);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  },

  /**
   * Eventos por tipo (SURF, MUSICA, TRILHA, GERAL)
   */
  async getEventsByType(eventType: string): Promise<PostEventResponseDTO[]> {
    try {
      console.log('[API] GET /postEvent/events-by-type/' + eventType);
      const response = await apiClient.get<PostEventResponseDTO[]>(
        `/postEvent/events-by-type/${eventType}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos por tipo:', error);
      throw error;
    }
  },

  /**
   * Eventos por localização
   */
  async getEventsByLocation(location: string): Promise<PostEventResponseDTO[]> {
    try {
      console.log('[API] GET /postEvent/events-by-location?location=' + location);
      const response = await apiClient.get<PostEventResponseDTO[]>(
        '/postEvent/events-by-location',
        { params: { location } }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos por localização:', error);
      throw error;
    }
  },
};

// src/services/api.ts - ADICIONAR estes services

// ═══════════════════════════════════════════════════════════════════════
// 🛡️ ADMIN SERVICES - Apenas para administradores
// ═══════════════════════════════════════════════════════════════════════

export const adminService = {
  /**
   * Visualizar TODOS os serviços (de todos os empreendedores)
   * Apenas admin pode acessar
   */
  async getAllServices(): Promise<PostServiceResponseDTO[]> {
    try {
      console.log('[API] GET /admin/all-services');
      const response = await apiClient.get<PostServiceResponseDTO[]>(
        '/admin/all-services'
      );
      console.log('[API] ✅ Total de serviços: ' + response.data.length);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os serviços:', error);
      throw error;
    }
  },

  /**
   * Visualizar TODOS os eventos (de todos os empreendedores)
   * Apenas admin pode acessar
   */
  async getAllEvents(): Promise<PostEventResponseDTO[]> {
    try {
      console.log('[API] GET /admin/all-events');
      const response = await apiClient.get<PostEventResponseDTO[]>(
        '/admin/all-events'
      );
      console.log('[API] ✅ Total de eventos: ' + response.data.length);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os eventos:', error);
      throw error;
    }
  },

  /**
   * Buscar atividades de um empreendedor específico
   */
  async getEntrepreneurActivities(entrepreneurId: string): Promise<{
    services: PostServiceResponseDTO[];
    events: PostEventResponseDTO[];
  }> {
    try {
      console.log('[API] GET /admin/entrepreneur/' + entrepreneurId);
      
      const services = await this.getAllServices();
      const events = await this.getAllEvents();
      
      const entrepreneurServices = services.filter(s => s.entrepreneurId === entrepreneurId);
      const entrepreneurEvents = events.filter(e => e.entrepreneurId === entrepreneurId);
      
      return {
        services: entrepreneurServices,
        events: entrepreneurEvents
      };
    } catch (error) {
      console.error('Erro ao buscar atividades do empreendedor:', error);
      throw error;
    }
  },

  /**
   * Contar total de atividades no sistema
   */
  async getStatistics(): Promise<{
    totalServices: number;
    totalEvents: number;
    totalEntrepreneurs: number;
    totalUsers: number;
  }> {
    try {
      const services = await this.getAllServices();
      const events = await this.getAllEvents();
      
      const uniqueEntrepreneurs = new Set([
        ...services.map(s => s.entrepreneurId),
        ...events.map(e => e.entrepreneurId)
      ]).size;
      
      return {
        totalServices: services.length,
        totalEvents: events.length,
        totalEntrepreneurs: uniqueEntrepreneurs,
        totalUsers: uniqueEntrepreneurs // Pode ser expandido depois
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }
};

export default apiClient;