import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { AppState, UserRole, LocalActivity, Appointment, Review } from '../types';
import { WelcomeScreen, LoginScreen, RegisterScreen, RoleSelectScreen } from './OnboardingScreens';
import { TouristSearchScreen, InteractiveMapScreen, EventDetailScreen, ServiceDetailScreen, RatingModal, AppointmentsScreen, EventsAndServicesScreen } from './TouristScreens';
import { EntrepreneurProfileScreen, ReviewsManagementScreen } from './EntrepreneurScreens';
import { AdminProfileScreen } from './AdminScreens';
import { CreateActivityScreen } from './CreateActivityScreen';
import { IMAGES, ACTIVITIES, INITIAL_REVIEWS, INITIAL_APPOINTMENTS } from '../data';

export const PhoneSimulator: React.FC = () => {
  // Master app state holding interactive data flow
  const [state, setState] = useState<AppState>({
    currentRole: UserRole.Turista,
    isLoggedIn: false,
    currentUserEmail: '',
    currentScreen: 'welcome', 
    selectedActivityId: null,
    ratingModalType: null,
    reviews: INITIAL_REVIEWS,
    appointments: INITIAL_APPOINTMENTS,
    activeTab: 'eventos',
    sidebarOpen: false,
    favorites: ['act-1', 'act-4'],
    activities: ACTIVITIES
  });

  const changeScreen = (screen: string) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const handleCreateActivity = (newAct: Omit<LocalActivity, 'id' | 'rating' | 'reviewsCount'>) => {
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
  };

  const handleLogin = (email: string, role: UserRole) => {
    setState(prev => {
      let nextScreen = 'map'; 
      if (role === UserRole.Empreendedor) nextScreen = 'entrepreneur_profile';
      if (role === UserRole.Administrador) nextScreen = 'admin_profile';

      return {
        ...prev,
        isLoggedIn: true,
        currentUserEmail: email,
        currentRole: role,
        currentScreen: nextScreen
      };
    });
  };

  const handleLogout = () => {
    setState(prev => ({
      ...prev,
      isLoggedIn: false,
      currentUserEmail: '',
      currentScreen: 'welcome'
    }));
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

  const submitRating = (starsMain: number, commentMain: string, starsSec: number, commentSec: string) => {
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
    
    alert('Sua avaliação foi enviada com sucesso! Atualizamos as métricas do perfil na orla.');
  };

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
      case 'register':
        return (
          <RegisterScreen 
            onBack={() => changeScreen('login')}
            onRegistered={(email) => {
              alert('Parabéns! Cadastro efetuado com sucesso.');
              handleLogin(email, UserRole.Turista);
            }}
            onHasAccount={() => changeScreen('login')}
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
            <span className="text-gray-400 hidden sm:inline">Olá, <strong>{state.currentUserEmail.split('@')[0]}</strong></span>
            <button 
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold"
            >
              Sair
            </button>
          </div>
        )}
      </header>

      {/* Conteúdo Principal expandido ocupando toda a viewport restante */}
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