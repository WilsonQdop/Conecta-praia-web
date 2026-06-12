export enum UserRole {
  Turista = 'Turista',
  Empreendedor = 'Empreendedor',
  Administrador = 'Administrador',
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface LocalActivity {
  id: string;
  title: string;
  icon: string; // lucide icon name or mapping
  date: string;
  location: string;
  organizer: string;
  price: string;
  rating: number;
  reviewsCount: string;
  image: string;
  details: string;
  category: 'CICLISMO' | 'CORRIDA' | 'CAMINHADA' | 'SURF' | 'RESTAURANTE' |
   'AUTÔNOMOS' | 'GERAL' | 'FITDANCE' | 'TRILHA'| 'BARRAQUEIRO' | 'BUGUEIRO' 
   | 'BAR' | 'ARTESANATO' | 'COMERCIOLOCAL';
  type: 'evento' | 'servico';
  isCustom?: boolean;
}

export interface Appointment {
  id: string;
  title: string;
  icon: string;
  date: string;
  location: string;
  organizer: string;
  price: string;
  rating: number;
  reviewsCount: string;
  category: string;
  isCustom?: boolean;
}

export interface AppState {
  currentRole: UserRole;
  isLoggedIn: boolean;
  currentUserEmail: string;
  currentUserName: string;
  currentScreen: string; // welcome, login, register, role_select, search, map, event_detail, service_detail, entrepreneur_profile, reviews_mgmt, admin_profile, appointments, events_services
    currentUserAvatar: string;
  
  selectedActivityId: string | null;
  ratingModalType: 'evento' | 'servico' | null;
  reviews: Review[];
  appointments: Appointment[];
  activeTab: 'eventos' | 'servicos'; // for the explore events/services screen
  sidebarOpen: boolean;
  favorites: string[]; // activity IDs
  activities: LocalActivity[];
}
