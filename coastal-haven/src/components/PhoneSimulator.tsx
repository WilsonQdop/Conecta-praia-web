// src/components/PhoneSimulator.tsx - VERSÃO SEM JWT DECODING
// Foco: Routing por perfil + Fluxo de registro correto
// ═══════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { AppState, UserRole, LocalActivity, Appointment, Review } from '../types';
import { WelcomeScreen, LoginScreen, RegisterScreen, RoleSelectScreen } from './OnboardingScreens';

import { TouristSearchScreen, InteractiveMapScreen, EventDetailScreen, ServiceDetailScreen, RatingModal, AppointmentsScreen, EventsAndServicesScreen, TouristProfileScreen } from './TouristScreens';
import { EntrepreneurProfileScreen, ReviewsManagementScreen, EntrepreneurServicesScreen } from './EntrepreneurScreens';
import { AdminAllActivitiesScreen, AdminProfileScreen } from './AdminScreens';
import { CreateActivityScreen } from './CreateActivityScreen';
import { IMAGES, ACTIVITIES, INITIAL_REVIEWS, INITIAL_APPOINTMENTS } from '../data';
import { authService, eventService, serviceService, reviewService, subscriptionService } from '../services/api';
import { response } from 'express';

export const PhoneSimulator: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentRole: UserRole.Turista,
    isLoggedIn: false,
    currentUserEmail: '',
    currentScreen: 'welcome', 
    currentUserName: '',
    selectedActivityId: null,
    ratingModalType: null,
    reviews: INITIAL_REVIEWS,
    appointments: INITIAL_APPOINTMENTS,
    activeTab: 'eventos',
    sidebarOpen: false,
    favorites: ['act-1', 'act-4'],
    activities: ACTIVITIES
  });

  // ════════════════════════════════════════════════════════════════
  // 🔐 VERIFICAR SESSÃO ANTERIOR AO CARREGAR
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const [currentScreen, setCurrentScreen] = useState<string>('entrepreneur_profile');
    

    console.log('[SESSION] Verificando sessão anterior...');

    // Simples: se tem token e email e role, restaura
    if (token && userEmail && userRole) {
      console.log('[SESSION] Sessão encontrada para:', userEmail);
      
      const mappedRole = mapBackendRoleToFrontend(userRole);
      const nextScreen = getScreenByRole(mappedRole);

      setState(prev => ({
        ...prev,
        isLoggedIn: true,
        currentUserEmail: userEmail,
        currentRole: mappedRole,
        currentScreen: nextScreen,
        currentUserName: userName || '',
      }));
    } else {
      console.log('[SESSION] Nenhuma sessão anterior');
    }
  }, []);

  // ════════════════════════════════════════════════════════════════
  // 🎯 MAPEAR ROLE DO BACKEND PARA FRONTEND
  // ════════════════════════════════════════════════════════════════
  const mapBackendRoleToFrontend = (backendRole: string): UserRole => {
    switch (backendRole) {
      case 'EMPREENDEDOR':
        return UserRole.Empreendedor;
      case 'ADMIN':
        return UserRole.Administrador;
      default:
        return UserRole.Turista;
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 🖼️ OBTER TELA INICIAL POR ROLE
  // ════════════════════════════════════════════════════════════════
  const getScreenByRole = (role: UserRole): string => {
    switch (role) {
      case UserRole.Empreendedor:
        return 'entrepreneur_profile';
      case UserRole.Administrador:
        return 'admin_profile';
      default: // Turista
        return 'map';
    }
  };

  const changeScreen = (screen: string) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const handleCreateActivity = async (newAct: Omit<LocalActivity, 'id' | 'rating' | 'reviewsCount'>) => {
    try {
      let response;
      
      if (newAct.type === 'evento') {
        response = await eventService.createEvent({
          title: newAct.title,
          eventType: newAct.category as any,
          location: newAct.location,
          value: parseFloat(newAct.price.replace(/[^\d.-]/g, '') || '0'),
          valueDescription: newAct.price,
          imageUrl: newAct.image,
          description: newAct.details,
        });
      } else {
        response = await serviceService.createService({
          title: newAct.title,
          serviceType: newAct.category as any,
          location: newAct.location,
          value: parseFloat(newAct.price.replace(/[^\d.-]/g, '') || '0'),
          valueDescription: newAct.price,
          imageUrl: newAct.image,
          description: newAct.details,
        });
      }

      setState(prev => {
        const added: LocalActivity = {
          ...newAct,
          id: `act-${Date.now()}`,
          rating: 5.0,
          reviewsCount: '1 avaliação',
          isCustom: true
        };
        
        let nextScreen = 'entrepreneur_profile';
        if (prev.currentRole === UserRole.Administrador) nextScreen = 'admin_profile';

        return {
          ...prev,
          activities: [added, ...prev.activities],
          currentScreen: nextScreen
        };
      });

      alert(`${newAct.type === 'evento' ? 'Evento' : 'Serviço'} criado com sucesso!`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao criar atividade';
      alert(`Erro: ${errorMessage}`);
      console.error('Erro ao criar atividade:', error);
    }
  };

  // ════════════════════════════════════════════════════════════════
  // ✅ LOGIN - COM ROUTING AUTOMÁTICO POR ROLE
  // ════════════════════════════════════════════════════════════════
const handleLogin = async (email: string, role: UserRole, name: string) => {
  console.log('[LOGIN] Login bem-sucedido para:', email, 'Role:', role, 'Name:', name);
  
  const nextScreen = getScreenByRole(role);

  setState(prev => ({
    ...prev,
    isLoggedIn: true,
    currentUserEmail: email,
    currentUserName: name, // ✅ AGORA FUNCIONA
    currentRole: role,
    currentScreen: nextScreen
  }));
};

  // ════════════════════════════════════════════════════════════════
  // 🚪 LOGOUT
  // ════════════════════════════════════════════════════════════════
  const handleLogout = () => {
    console.log('[LOGOUT] Desconectando usuário...');
    authService.logout();
    
    setState(prev => ({
      ...prev,
      isLoggedIn: false,
      currentUserEmail: '',
      currentRole: UserRole.Turista,
      currentScreen: 'welcome'
    }));
  };

  // ════════════════════════════════════════════════════════════════
  // 📝 REGISTRO - VOLTA PARA LOGIN (NÃO FAZ LOGIN AUTOMÁTICO)
  // ════════════════════════════════════════════════════════════════
  const handleRegistered = (email: string) => {
    console.log('[REGISTER] Registro bem-sucedido para:', email);
    console.log('[REGISTER] Voltando para tela de login...');
    
    // Apenas volta para login - NÃO faz login automático
    changeScreen('login');
    
    // Mostrar mensagem amigável
    setTimeout(() => {
      alert(`Bem-vindo! ${email}\n\nAcesso criado com sucesso. Por favor, faça login com suas credenciais.`);
    }, 300);
  };

  const selectActivity = (id: string, type: 'evento' | 'servico') => {
    setState(prev => ({
      ...prev,
      selectedActivityId: id,
      currentScreen: type === 'evento' ? 'event_detail' : 'service_detail'
    }));
  };

  const toggleFavorite = (id: string) => {
    setState(prev => {
      const isFav = prev.favorites.includes(id);
      const nextFavs = isFav 
        ? prev.favorites.filter(x => x !== id)
        : [...prev.favorites, id];
      return { ...prev, favorites: nextFavs };
    });
  };

  const deleteReview = (id: string) => {
    setState(prev => ({
      ...prev,
      reviews: prev.reviews.filter(r => r.id !== id)
    }));
  };

  const registerAppointment = (activity: LocalActivity) => {
    setState(prev => {
      if (prev.appointments.some(app => app.title === activity.title)) {
        return prev;
      }
      const newApp: Appointment = {
        id: `app-${Date.now()}`,
        title: activity.title,
        icon: activity.icon,
        date: activity.date,
        location: activity.location,
        organizer: activity.organizer,
        price: activity.price,
        rating: activity.rating,
        reviewsCount: activity.reviewsCount,
        category: activity.category
      };
      return {
        ...prev,
        appointments: [newApp, ...prev.appointments]
      };
    });
  };

  const addReminder = (activity: LocalActivity) => {
    registerAppointment(activity);
  };

  const cancelAppointment = (id: string) => {
    setState(prev => ({
      ...prev,
      appointments: prev.appointments.filter(app => app.id !== id)
    }));
  };

  const submitRating = async (starsMain: number, commentMain: string, starsSec: number, commentSec: string) => {
    try {
      const selectedActivity = state.activities.find(a => a.id === state.selectedActivityId);
      
      if (!selectedActivity) {
        alert('Atividade não encontrada');
        return;
      }

      if (selectedActivity.type === 'evento') {
        await reviewService.reviewEvent(state.selectedActivityId || '', {
          rating: starsMain,
          comment: commentMain || 'Serviço maravilhoso de se apreciar!'
        });
      } else {
        await reviewService.reviewService(state.selectedActivityId || '', {
          rating: starsMain,
          comment: commentMain || 'Serviço maravilhoso de se apreciar!'
        });
      }

      const newRev: Review = {
        id: `rev-${Date.now()}`,
        userName: state.currentUserEmail ? state.currentUserEmail.split('@')[0] : 'Turista Satisfeito',
        rating: starsMain,
        comment: commentMain || 'Serviço maravilhoso de se apreciar!',
        date: new Date().toLocaleDateString('pt-BR')
      };

      setState(prev => ({
        ...prev,
        reviews: [newRev, ...prev.reviews],
        ratingModalType: null
      }));

      alert('Sua avaliação foi enviada com sucesso!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao enviar avaliação';
      alert(`Erro: ${errorMessage}`);
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 🎬 RENDERIZAR TELAS
  // ════════════════════════════════════════════════════════════════
  const renderPhoneScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => changeScreen('login')} />;
      
      case 'login':
        return (
          <LoginScreen 
            onBack={() => changeScreen('welcome')}
            onRegister={() => changeScreen('register')}
            onLogin={handleLogin}
          />
        );

        case 'profile_hub':
        return (
          <TouristProfileScreen 
            onBack={() => changeScreen('map')} 
            onLogout={handleLogout}
            onNavigate={changeScreen}
            touristName={state.currentUserName || state.currentUserEmail.split('@')[0]} 
          />
        );
      
      case 'register':
        return (
          <RegisterScreen 
            onBack={() => changeScreen('login')}
            onRegistered={handleRegistered}
            onHasAccount={() => changeScreen('login')}
          />
        );

        case 'entrepreneur_services':
      return (
        <EntrepreneurServicesScreen 
          onBack={() => changeScreen('entrepreneur_profile')}
          onNavigate={changeScreen}
          entrepreneurEmail={state.currentUserEmail}
        />
      );

      case 'admin_all_activities':
  return (
    <AdminAllActivitiesScreen 
      onBack={() => changeScreen('admin_profile')}
      onNavigate={changeScreen}
    />
  );
      
      case 'role_select':
        return (
          <RoleSelectScreen 
            onBack={() => changeScreen('welcome')}
            onSelect={(role) => {
              setState(prev => ({ ...prev, currentRole: role }));
              changeScreen('login');
            }}
          />
        );
      
      case 'search':
        return (
          <TouristSearchScreen 
            onNavigate={changeScreen}
            onSelectActivity={selectActivity}
            activities={state.activities}
          />
        );
      
      case 'map':
        return (
          <InteractiveMapScreen 
            onNavigate={changeScreen}
            onSelectActivity={selectActivity}
            activities={state.activities}
          />
        );
      
      case 'event_detail':
        return (
          <EventDetailScreen 
            activityId={state.selectedActivityId || 'act-1'}
            onBack={() => changeScreen('map')}
            onNavigate={changeScreen}
            onEvaluate={() => setState(prev => ({ ...prev, ratingModalType: 'evento' }))}
            onRegisterAppointment={registerAppointment}
            isFavorited={state.selectedActivityId ? state.favorites.includes(state.selectedActivityId) : false}
            onToggleFavorite={toggleFavorite}
            activities={state.activities}
          />
        );
      
      case 'service_detail':
        return (
          <ServiceDetailScreen 
            activityId={state.selectedActivityId || 'act-4'}
            onBack={() => changeScreen('events_services')}
            onNavigate={changeScreen}
            onEvaluate={() => setState(prev => ({ ...prev, ratingModalType: 'servico' }))}
            onAddReminder={addReminder}
            isFavorited={state.selectedActivityId ? state.favorites.includes(state.selectedActivityId) : false}
            onToggleFavorite={toggleFavorite}
            activities={state.activities}
          />
        );
      
      case 'entrepreneur_profile':
        return (
          <EntrepreneurProfileScreen 
            onBack={() => changeScreen('welcome')}
            onNavigate={changeScreen}
            reviews={state.reviews}
            onLogout={handleLogout}
          />
        );
      
      case 'reviews_mgmt':
        return (
          <ReviewsManagementScreen 
            onBack={() => changeScreen('entrepreneur_profile')}
            reviews={state.reviews}
            onDeleteReview={deleteReview}
          />
        );
      
      case 'admin_profile':
        return (
          <AdminProfileScreen 
            onBack={() => changeScreen('welcome')}
            onLogout={handleLogout}
            onNavigate={changeScreen}
          />
        );
      
      case 'appointments':
        return (
          <AppointmentsScreen 
            onNavigate={changeScreen}
            appointments={state.appointments}
            onCancelAppointment={cancelAppointment}
            onExplore={() => changeScreen('events_services')}
          />
        );
      
      case 'events_services':
        return (
          <EventsAndServicesScreen 
            onNavigate={changeScreen}
            onSelectActivity={selectActivity}
            initialTab={state.activeTab}
            activities={state.activities}
          />
        );
      
      case 'create_activity':
        return (
          <CreateActivityScreen 
            onBack={() => {
              const backTo = state.currentRole === UserRole.Administrador ? 'admin_profile' : 'entrepreneur_profile';
              changeScreen(backTo);
            }}
            onSave={handleCreateActivity}
            organizerName={state.currentUserName}

            
          />
        );
      
      default:
        return <WelcomeScreen onNext={() => changeScreen('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col w-full">
      
      {/* Menu / Header Superior da Web */}
      <header className="w-full bg-[#1e2025] text-gray-100 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#80d6d1] to-teal-400">
            Coastal Haven
          </h1>
          <span className="hidden md:inline-block text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
            Porto de Galinhas
          </span>
        </div>
        
        {state.isLoggedIn && (
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400 hidden sm:inline">
              Olá, <strong>{state.currentUserEmail.split('@')[0]}</strong>
            </span>
            <span className="text-xs bg-[#80d6d1] text-gray-900 px-3 py-1 rounded-full font-bold">
              {state.currentRole}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold cursor-pointer"
            >
              Sair
            </button>
          </div>
        )}
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 w-full relative flex flex-col overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={state.currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full flex flex-col flex-1"
          >
            {renderPhoneScreen()}
          </motion.div>
        </AnimatePresence>

        {/* MODAL DE AVALIAÇÃO FLUTUANTE */}
        <AnimatePresence>
          {state.ratingModalType && (
            <RatingModal 
              type={state.ratingModalType}
              onClose={() => setState(prev => ({ ...prev, ratingModalType: null }))}
              onSubmit={submitRating}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PhoneSimulator;