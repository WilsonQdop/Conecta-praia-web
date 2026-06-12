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
// 🔐 AUTH & PROFILE SERVICES
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

// DTO para atualização de perfis (Campos opcionais para evitar sobrescrever com nulo)
export interface UpdateProfileRequestDTO {
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
}

export const authService = {
  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
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

// 🟢 NOVOS SERVIÇOS ADICIONADOS CONFORME REGRAS DO BACKEND

export const touristService = {
  async updateProfile(profileData: UpdateProfileRequestDTO): Promise<void> {
    try {
      console.log('[API] PUT /tourist/update');
      await apiClient.put('/tourist/update', profileData);
      console.log('[API] ✅ Perfil do turista atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar perfil do turista:', error);
      throw error;
    }
  }
};

export const entrepreneurService = {
  async updateProfile(profileData: UpdateProfileRequestDTO): Promise<void> {
    try {
      console.log('[API] PUT /empreendedor/update');
      await apiClient.put('/empreendedor/update', profileData);
      console.log('[API] ✅ Perfil do empreendedor atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar perfil do empreendedor:', error);
      throw error;
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// 📋 RESPONSES DTOs COMPARTILHADOS
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// 📝 POST EVENT SERVICES (EMPREENDEDOR)
// ═══════════════════════════════════════════════════════════════

export interface CreateEventRequest {
  title: string;
  eventType: 'SURF' | 'MUSICA' | 'TRILHA' | 'GERAL';
  location: string;
  value: number;
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
      const response = await apiClient.post<CreateEventResponse>('/postEvent/create', eventData);
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
  serviceType: 'RESTAURANTE' | 'BAR' | 'AUTONOMO' | 'GERAL';
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
      const response = await apiClient.post<CreateServiceResponse>('/postService/create', serviceData);
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
      const response = await apiClient.post<SubscribeResponse>(`/subscriptions/services/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao se inscrever no serviço:', error);
      throw error;
    }
  },

  async subscribeToEvent(eventId: string): Promise<SubscribeResponse> {
    try {
      const response = await apiClient.post<SubscribeResponse>(`/subscriptions/events/${eventId}`);
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

// ═══════════════════════════════════════════════════════════════
// 🔽 POSTS FETCH SERVICES
// ═══════════════════════════════════════════════════════════════

export const postServiceService = {
  async getMyServices(): Promise<PostServiceResponseDTO[]> {
    try {
      console.log('[API] GET /postService/my-services');
      const response = await apiClient.get<PostServiceResponseDTO[]>('/postService/my-services');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar meus serviços:', error);
      throw error;
    }
  },

  async getAllServices(): Promise<PostServiceResponseDTO[]> {
    try {
      console.log('[API] GET /postService/all-services');
      const response = await apiClient.get<PostServiceResponseDTO[]>('/postService/all-services');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }
  },

  async getServicesByType(serviceType: string): Promise<PostServiceResponseDTO[]> {
    try {
      const response = await apiClient.get<PostServiceResponseDTO[]>(`/postService/services-by-type/${serviceType}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getServicesByLocation(location: string): Promise<PostServiceResponseDTO[]> {
    try {
      const response = await apiClient.get<PostServiceResponseDTO[]>('/postService/services-by-location', { params: { location } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const postEventService = {
  async getMyEvents(): Promise<PostEventResponseDTO[]> {
    try {
      console.log('[API] GET /postEvent/my-events');
      const response = await apiClient.get<PostEventResponseDTO[]>('/postEvent/my-events');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar meus eventos:', error);
      throw error;
    }
  },

  async getAllEvents(): Promise<PostEventResponseDTO[]> {
    try {
      console.log('[API] GET /postEvent/all-events');
      const response = await apiClient.get<PostEventResponseDTO[]>('/postEvent/all-events');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  },

  async getEventsByType(eventType: string): Promise<PostEventResponseDTO[]> {
    try {
      const response = await apiClient.get<PostEventResponseDTO[]>(`/postEvent/events-by-type/${eventType}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getEventsByLocation(location: string): Promise<PostEventResponseDTO[]> {
    try {
      const response = await apiClient.get<PostEventResponseDTO[]>('/postEvent/events-by-location', { params: { location } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ═══════════════════════════════════════════════════════════════
// 🛡️ ADMIN SERVICES
// ═══════════════════════════════════════════════════════════════

export const adminService = {
  async getAllServices(): Promise<PostServiceResponseDTO[]> {
    try {
      const response = await apiClient.get<PostServiceResponseDTO[]>('/admin/all-services');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllEvents(): Promise<PostEventResponseDTO[]> {
    try {
      const response = await apiClient.get<PostEventResponseDTO[]>('/admin/all-events');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getEntrepreneurActivities(entrepreneurId: string) {
    try {
      const services = await this.getAllServices();
      const events = await this.getAllEvents();
      return {
        services: services.filter(s => s.entrepreneurId === entrepreneurId),
        events: events.filter(e => e.entrepreneurId === entrepreneurId)
      };
    } catch (error) {
      throw error;
    }
  },

  async getStatistics() {
    try {
      const services = await this.getAllServices();
      const events = await this.getAllEvents();
      const uniqueEntrepreneurs = new Set([...services.map(s => s.entrepreneurId), ...events.map(e => e.entrepreneurId)]).size;
      return {
        totalServices: services.length,
        totalEvents: events.length,
        totalEntrepreneurs: uniqueEntrepreneurs,
        totalUsers: uniqueEntrepreneurs
      };
    } catch (error) {
      throw error;
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// 🎫 REGISTERED SUBSCRIPTIONS
// ═══════════════════════════════════════════════════════════════

export const registeredEvent = {
  async getMyRegisteredEvents(): Promise<PostEventResponseDTO[]> {
    try {
      const response = await apiClient.get<PostEventResponseDTO[]>('/registered/events');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getMyRegisteredServices(): Promise<PostServiceResponseDTO[]> {
    try {
      const response = await apiClient.get<PostServiceResponseDTO[]>('/registered/services');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const registeredService = {
  async listMyRegisteredEvents(): Promise<PostEventResponseDTO[]> {
    return registeredEvent.getMyRegisteredEvents();
  },
  async listMyRegisteredServices(): Promise<PostServiceResponseDTO[]> {
    return registeredEvent.getMyRegisteredServices();
  }
};

export default apiClient;