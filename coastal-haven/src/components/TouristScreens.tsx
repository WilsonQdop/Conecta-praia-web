import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { LocalActivity, Appointment, Review } from '../types';
import { ACTIVITIES, IMAGES } from '../data';

// --- SHARED REUSABLE BOTTOM TAB NAV BAR ---
interface BottomTabNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export const BottomTabNav: React.FC<BottomTabNavProps> = ({ activeScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] rounded-t-2xl px-6 py-2.5 pb-5 flex justify-around items-center">
      <button 
        onClick={() => onNavigate('map')}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${activeScreen === 'map' ? 'text-[#006a66]' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className={`p-1.5 rounded-full ${activeScreen === 'map' ? 'bg-[#80d6d1]/20' : ''}`}>
          <LucideIcon name="Compass" size={18} />
        </span>
        <span className="text-[10px] font-semibold">Explorar</span>
      </button>

      <button 
        onClick={() => onNavigate('search')}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${activeScreen === 'search' ? 'text-[#006a66]' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className={`p-1.5 rounded-full ${activeScreen === 'search' ? 'bg-[#80d6d1]/20' : ''}`}>
          <LucideIcon name="Search" size={18} />
        </span>
        <span className="text-[10px] font-semibold">Buscar</span>
      </button>

      <button 
        onClick={() => onNavigate('appointments')}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${activeScreen === 'appointments' ? 'text-[#006a66]' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className={`p-1.5 rounded-full ${activeScreen === 'appointments' ? 'bg-[#80d6d1]/20' : ''}`}>
          <LucideIcon name="CalendarCheck" size={18} />
        </span>
        <span className="text-[10px] font-semibold">Reservas</span>
      </button>

      <button 
        onClick={() => onNavigate('events_services')}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${activeScreen === 'events_services' ? 'text-[#006a66]' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className={`p-1.5 rounded-full ${activeScreen === 'events_services' ? 'bg-[#80d6d1]/20' : ''}`}>
          <LucideIcon name="Ticket" size={18} />
        </span>
        <span className="text-[10px] font-semibold">Eventos</span>
      </button>

      <button 
        onClick={() => onNavigate('profile_hub')}
        className={`flex flex-col items-center justify-center gap-1 transition-all ${activeScreen === 'profile_hub' ? 'text-[#006a66]' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className="p-1 px-2 rounded-full">
          <LucideIcon name="User" size={18} />
        </span>
        <span className="text-[10px] font-semibold">Perfil</span>
      </button>
    </nav>
  );
};


// --- SCREEN 5: TOURIST SEARCH SCREEN (BUSCA - MAPA) ---
interface SearchMapProps {
  onNavigate: (screen: string) => void;
  onSelectActivity: (id: string, type: 'evento' | 'servico') => void;
  activities?: LocalActivity[];
}

export const TouristSearchScreen: React.FC<SearchMapProps> = ({ onNavigate, onSelectActivity, activities }) => {
  const [filterType, setFilterType] = useState<'tudo' | 'eventos' | 'servicos'>('tudo');
  const [searchVal, setSearchVal] = useState('');

  const filteredPins = (activities || ACTIVITIES).filter(a => {
    if (filterType === 'eventos' && a.type !== 'evento') return false;
    if (filterType === 'servicos' && a.type !== 'servico') return false;
    if (searchVal && !a.title.toLowerCase().includes(searchVal.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="relative w-full h-full text-gray-900 bg-[#fbf9f8] overflow-hidden">
      {/* Map simulation background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.searchMap})` }}
      />

      {/* Floating Header */}
      <header className="absolute top-4 left-0 w-full z-10 px-4">
        <div className="flex items-center gap-2 pt-2">
          {/* Search bar */}
          <div className="flex-grow bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center px-4 py-2.5 border border-gray-100">
            <LucideIcon name="Search" className="text-gray-400 mr-2" size={18} />
            <input 
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Buscar em Porto de Galinhas..."
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-semibold text-gray-800"
            />
            {searchVal && (
              <button onClick={() => setSearchVal('')} className="text-gray-400 hover:text-gray-600 p-0.5">
                <LucideIcon name="X" size={14} />
              </button>
            )}
          </div>
          {/* Filter button */}
          <button 
            onClick={() => {
              // Quick toggling of categories
              if (filterType === 'tudo') setFilterType('eventos');
              else if (filterType === 'eventos') setFilterType('servicos');
              else setFilterType('tudo');
            }}
            className="bg-[#80d6d1] text-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <LucideIcon name="SlidersHorizontal" size={18} />
          </button>
        </div>

        {/* Quick indicators */}
        <div className="flex gap-1.5 mt-3">
          <span className="text-[10px] bg-white/90 backdrop-blur-sm text-gray-800 font-extrabold px-3 py-1 rounded-full shadow-sm">
            Filtro: {filterType.toUpperCase()}
          </span>
          {searchVal && (
            <span className="text-[10px] bg-white/90 backdrop-blur-sm text-gray-800 font-extrabold px-3 py-1 rounded-full shadow-sm">
              Pesquisa: "{searchVal}"
            </span>
          )}
        </div>
      </header>

      {/* Map pins overlays */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {filteredPins.map((a, i) => {
          // Set positions matching image pins
          let top = '30%';
          let left = '50%';
          if (a.id === 'act-1') { top = '25%'; left = '20%'; } // Surf
          if (a.id === 'act-2') { top = '50%'; left = '45%'; } // Music
          if (a.id === 'act-4') { top = '70%'; left = '60%'; } // Peixada
          if (a.id === 'act-5') { top = '40%'; left = '75%'; } // Moqueca
          if (a.id === 'act-6') { top = '15%'; left = '65%'; } // Caipiroska

          // Fallback placements for new user-registered custom slots
          if (!['act-1', 'act-2', 'act-4', 'act-5', 'act-6'].includes(a.id)) {
            const tops = ['35%', '58%', '52%', '18%'];
            const lefts = ['24%', '82%', '14%', '86%'];
            const idx = a.title.charCodeAt(0) % tops.length;
            top = tops[idx];
            left = lefts[idx];
          }

          return (
            <div 
              key={a.id}
              style={{ top, left }}
              className="absolute pointer-events-auto cursor-pointer flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
              onClick={() => onSelectActivity(a.id, a.type)}
            >
              <div className="bg-white/95 border border-pink-100 rounded-lg px-2 py-1 shadow-md mb-1 animate-pulse">
                <span className="text-[9px] font-extrabold text-pink-500 whitespace-nowrap">
                  {a.title}
                </span>
              </div>
              <div className="w-5 h-5 bg-pink-500 rounded-full border-4 border-white shadow-xl marker-pulse" />
            </div>
          );
        })}
      </div>

      <BottomTabNav activeScreen="search" onNavigate={onNavigate} />
    </div>
  );
};


// --- SCREEN 6: INTERACTIVE MAP OVERVIEW (MAPA INTERATIVO PRINCIPAL) ---
interface InteractiveMapProps {
  onNavigate: (screen: string) => void;
  onSelectActivity: (id: string, type: 'evento' | 'servico') => void;
  activities?: LocalActivity[];
}

export const InteractiveMapScreen: React.FC<InteractiveMapProps> = ({ onNavigate, onSelectActivity, activities }) => {
  return (
    <div className="relative w-full h-full text-gray-900 bg-[#fbf9f8] overflow-hidden">
      {/* Map simulation background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.interactiveMap})` }}
      />

      {/* Header bar */}
      <header className="fixed top-0 left-0 w-full z-10 flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('welcome')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={18} />
          </button>
          <h1 className="text-base font-extrabold tracking-tight">Porto de Galinhas</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-[#80d6d1] text-gray-950 font-black px-2.5 py-1 rounded-full">
            MAPA
          </span>
          <div 
            onClick={() => onNavigate('profile_hub')}
            className="w-10 h-10 rounded-full border-2 border-[#80d6d1] overflow-hidden shadow-sm cursor-pointer"
          >
            <img src={IMAGES.userProfile} alt="User Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Pins Overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* Enotel Pin */}
        <div 
          onClick={() => onSelectActivity('act-2', 'evento')}
          className="absolute top-[20%] left-[55%] pointer-events-auto cursor-pointer flex flex-col items-center"
        >
          <div className="bg-white/95 px-2 py-1 rounded shadow-md mb-1 border border-pink-100">
            <span className="text-[9px] font-extrabold text-pink-500">Enotel Festival</span>
          </div>
          <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white marker-pulse shadow-lg" />
        </div>

        {/* Ruda Pin */}
        <div 
          onClick={() => onSelectActivity('act-4', 'servico')}
          className="absolute top-[45%] left-[30%] pointer-events-auto cursor-pointer flex flex-col items-center"
        >
          <div className="bg-white/95 px-2 py-1 rounded shadow-md mb-1 border border-pink-100">
            <span className="text-[9px] font-extrabold text-pink-500">Ruda Peixada</span>
          </div>
          <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white marker-pulse shadow-lg" />
        </div>

        {/* Central Pin */}
        <div 
          onClick={() => onSelectActivity('act-1', 'evento')}
          className="absolute top-[68%] left-[45%] pointer-events-auto cursor-pointer flex flex-col items-center"
        >
          <div className="bg-white/95 px-2 py-1 rounded shadow-md mb-1 border border-pink-100">
            <span className="text-[9px] font-extrabold text-pink-500">Surf estilo de vida</span>
          </div>
          <div className="w-4 h-4 bg-[#006a66] rounded-full border-2 border-white marker-pulse shadow-lg" />
        </div>

        {/* Praia pin */}
        <div 
          onClick={() => onSelectActivity('act-5', 'servico')}
          className="absolute top-[75%] left-[70%] pointer-events-auto cursor-pointer flex flex-col items-center"
        >
          <div className="bg-white/95 px-2 py-1 rounded shadow-md mb-1 border border-pink-100">
            <span className="text-[9px] font-extrabold text-pink-500">Praia de Porto</span>
          </div>
          <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white marker-pulse shadow-lg" />
        </div>

        {/* Dynamic customized pins */}
        {(activities || []).filter(a => a.isCustom || !['act-1', 'act-2', 'act-4', 'act-5'].includes(a.id)).map((act, idx) => {
          const tops = ['35%', '58%', '52%', '18%'];
          const lefts = ['22%', '80%', '16%', '84%'];
          const top = tops[idx % tops.length];
          const left = lefts[idx % lefts.length];
          return (
            <div 
              key={act.id}
              style={{ top, left }}
              className="absolute pointer-events-auto cursor-pointer flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 animate-bounce animate-pulse"
              onClick={() => onSelectActivity(act.id, act.type)}
            >
              <div className="bg-[#006a66] text-white px-2 py-1 rounded shadow-md mb-1 border border-white">
                <span className="text-[9px] font-extrabold whitespace-nowrap">★ {act.title}</span>
              </div>
              <div className="w-4 h-4 bg-[#006a66] rounded-full border-2 border-white marker-pulse shadow-lg" />
            </div>
          );
        })}
      </div>

      <BottomTabNav activeScreen="map" onNavigate={onNavigate} />
    </div>
  );
};


// --- SCREEN 7: EVENT DETAILS (AULA DE SURF) ---
interface EventDetailProps {
  activityId: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onEvaluate: () => void;
  onRegisterAppointment: (activity: LocalActivity) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  activities?: LocalActivity[];
}

export const EventDetailScreen: React.FC<EventDetailProps> = ({
  activityId,
  onBack,
  onNavigate,
  onEvaluate,
  onRegisterAppointment,
  isFavorited,
  onToggleFavorite,
  activities
}) => {
  const actList = activities || ACTIVITIES;
  const activity = actList.find(a => a.id === activityId) || actList[0];

  const handleRegister = () => {
    onRegisterAppointment(activity);
    alert(`Inscrição confirmada para "${activity.title}"! Acesse a aba "Reservas" para conferir.`);
  };

  return (
    <div className="relative w-full h-full text-gray-900 bg-[#fbf9f8] overflow-y-auto no-scrollbar pb-32">
      {/* Dynamic Header actions */}
      <header className="fixed top-15 left-0 right-0 z-50 px-4 py-2 flex justify-between items-center bg-transparent">
        <button 
          onClick={onBack}
          className="bg-white/95 p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 transition-colors active:scale-95 cursor-pointer"
        >
          <LucideIcon name="ArrowLeft" size={20} />
        </button>

        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: activity.title, text: activity.details, url: window.location.href });
              } else {
                alert(`Compartilhando: ${activity.title} em Porto de Galinhas!`);
              }
            }}
            className="bg-white/95 p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <LucideIcon name="Share2" size={18} />
          </button>
          
          <button 
            onClick={() => onToggleFavorite(activity.id)}
            className="bg-white/95 p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <LucideIcon 
              name="Heart" 
              size={18} 
              className={isFavorited ? "text-red-500 fill-current" : "text-gray-700"} 
            />
          </button>
        </div>
      </header>

      {/* Map location background area */}
      <section className="h-[280px] w-full relative z-0">
        <img 
          src={IMAGES.surfMapDetail} 
          alt="Mapa do Surf" 
          className="w-full h-full object-cover filter brightness-95" 
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#006a66] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <LucideIcon name="MapPin" size={12} fill="white" />
            <span>{activity.location}</span>
          </div>
        </div>
      </section>

      {/* Main card details with drag handle style */}
      <section className="relative z-10 -mt-10 px-4">
        <div className="bg-[#f0eded]/95 rounded-t-[32px] shadow-2xl p-6 flex flex-col items-center">
          <div className="w-12 h-1 bg-gray-400 rounded-full mb-6 opacity-40" />

          <h1 className="text-2xl font-black text-gray-900 text-center mb-6 leading-tight">
            {activity.title}
          </h1>

          {/* Details Bento Grid */}
          <div className="w-full bg-[#e4e2e1] rounded-2xl p-5 space-y-4 shadow-sm mb-6">
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-0.5">LOCAL</span>
              <p className="text-sm font-bold text-gray-900">{activity.organizer}</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-0.5">DATA</span>
              <p className="text-sm font-bold text-gray-900">{activity.date}</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-0.5">VALOR</span>
              <p className="text-base font-extrabold text-[#006a66]">{activity.price}</p>
            </div>

            <div className="pt-3 border-t border-gray-300">
              <span className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider text-center mb-2">DESCRIÇÃO</span>
              <p className="text-xs text-gray-700 text-center leading-relaxed">
                {activity.details}
              </p>
            </div>
          </div>

          {/* Core Action buttons inside detail */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
            <button 
              onClick={onEvaluate}
              className="flex items-center justify-center gap-1 bg-[#80d6d1] text-gray-900 font-bold py-3 px-4 rounded-full shadow-sm hover:brightness-105 transition-all cursor-pointer text-sm"
            >
              <LucideIcon name="Star" size={16} />
              <span>Avaliar</span>
            </button>
            <button 
              onClick={handleRegister}
              className="flex items-center justify-center gap-1 bg-[#006a66] text-white font-bold py-3 px-4 rounded-full shadow-md hover:brightness-110 transition-all cursor-pointer text-sm"
            >
              <LucideIcon name="CheckCircle" size={16} />
              <span>Inscrever</span>
            </button>
          </div>
        </div>
      </section>

      <BottomTabNav activeScreen="map" onNavigate={onNavigate} />
    </div>
  );
};


// --- SCREEN 8: SERVICE DETAILS (PEIXADA DO NÊ) ---
interface ServiceDetailProps {
  activityId: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onEvaluate: () => void;
  onAddReminder: (activity: LocalActivity) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  activities?: LocalActivity[];
}

export const ServiceDetailScreen: React.FC<ServiceDetailProps> = ({
  activityId,
  onBack,
  onNavigate,
  onEvaluate,
  onAddReminder,
  isFavorited,
  onToggleFavorite,
  activities
}) => {
  const actList = activities || ACTIVITIES;
  const activity = actList.find(a => a.id === activityId) || actList[3];

  const handleReminder = () => {
    onAddReminder(activity);
    alert(`Lembrete de compromisso agendado para "${activity.title}"! Veja no painel de Reservas.`);
  };

  return (
    <div className="relative w-full h-full text-gray-900 bg-[#fbf9f8] overflow-y-auto no-scrollbar pb-32">
      {/* Header bar */}
      <header className="fixed top-2 left-0 right-0 z-50 px-4 py-2 flex justify-between items-center bg-transparent">
        <button 
          onClick={onBack}
          className="bg-white/95 p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 transition-colors active:scale-95 cursor-pointer"
        >
          <LucideIcon name="ArrowLeft" size={20} />
        </button>

        <div className="flex gap-2">
          <button 
            onClick={() => alert(`Link de compartilhamento para "${activity.title}" copiado!`)}
            className="bg-white/95 p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            <LucideIcon name="Share2" size={18} />
          </button>
          
          <button 
            onClick={() => onToggleFavorite(activity.id)}
            className="bg-white/95 p-2 rounded-full shadow-md text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            <LucideIcon 
              name="Heart" 
              size={18} 
              className={isFavorited ? "text-red-500 fill-current" : "text-gray-700"} 
            />
          </button>
        </div>
      </header>

      {/* Map location background area */}
      <section className="h-[280px] w-full relative z-0">
        <img 
          src={IMAGES.peixadaMapDetail} 
          alt="Mapa do Nê" 
          className="w-full h-full object-cover filter brightness-95" 
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#00201e] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 opacity-90">
            <LucideIcon name="MapPin" size={13} className="text-[#80d6d1]" />
            <span>{activity.location}</span>
          </div>
        </div>
      </section>

      {/* Content details sheet */}
      <section className="relative z-10 -mt-10 px-4">
        <div className="bg-[#f8f5f0] rounded-t-[40px] shadow-2xl p-6 flex flex-col items-center">
          <div className="w-12 h-1 bg-gray-300 rounded-full mb-6 opacity-55" />

          <h1 className="text-2xl font-black text-gray-900 text-center mb-4 leading-tight">
            {activity.title}
          </h1>

          <div className="w-full bg-[#e6e2da]/60 rounded-3xl p-5 space-y-4 mb-6 shadow-sm">
            <div className="text-center">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block mb-0.5">LOCAL</span>
              <p className="text-sm font-bold text-gray-900">{activity.organizer}</p>
            </div>
            
            <div className="text-center">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block mb-0.5">DATA DO COMPROMISSO</span>
              <p className="text-sm font-bold text-gray-900">{activity.date}</p>
            </div>

            <div className="text-center pt-2">
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider block mb-1">PROMOÇÃO / DESCRIÇÃO</span>
              <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                {activity.details}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
            <button 
              onClick={handleReminder}
              className="flex items-center justify-center gap-1.5 bg-[#80d6d1] text-gray-950 font-bold py-3.5 px-4 rounded-xl shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer text-xs uppercase"
            >
              <LucideIcon name="Bell" size={15} />
              <span>Lembrar-me</span>
            </button>
            
            <button 
              onClick={onEvaluate}
              className="flex items-center justify-center gap-1.5 bg-[#006a66] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer text-xs uppercase"
            >
              <LucideIcon name="Star" size={15} />
              <span>Avaliar</span>
            </button>
          </div>
        </div>
      </section>

      <BottomTabNav activeScreen="map" onNavigate={onNavigate} />
    </div>
  );
};


// --- SCREEN 9: DECORATIVE RATING MODAL OVERLAY ---
interface RatingModalProps {
  type: 'evento' | 'servico';
  onClose: () => void;
  onSubmit: (starsEventService: number, commentEventService: string, starsExtra: number, commentExtra: string) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ type, onClose, onSubmit }) => {
  const [starsMain, setStarsMain] = useState(0);
  const [starsSec, setStarsSec] = useState(0);
  const [commentMain, setCommentMain] = useState('');
  const [commentSec, setCommentSec] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (starsMain === 0) {
      alert('Por favor, escolha uma avaliação em estrelas.');
      return;
    }
    onSubmit(starsMain, commentMain, starsSec, commentSec);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#white] bg-white w-full max-w-sm rounded-[28px] p-6 shadow-2xl relative overflow-y-auto max-h-[85vh] no-scrollbar text-gray-900 border border-gray-100"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer text-gray-600"
        >
          <LucideIcon name="X" size={16} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* Section 1 */}
          <div className="text-center space-y-3">
            <h2 className="text-lg font-black text-gray-900">
              {type === 'evento' ? 'Avalie o evento' : 'Avalie o serviço'}
            </h2>
            
            {/* Main Stars */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button 
                  type="button"
                  key={s}
                  onClick={() => setStarsMain(s)}
                  className="p-1 cursor-pointer transform active:scale-125 transition-transform"
                >
                  <LucideIcon 
                    name="Star" 
                    size={32} 
                    className={s <= starsMain ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                  />
                </button>
              ))}
            </div>

            {/* Comment Area */}
            <div className="text-left">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Fale mais sobre a sua experiência:
              </label>
              <textarea 
                rows={3}
                value={commentMain}
                onChange={(e) => setCommentMain(e.target.value)}
                placeholder={type === 'evento' ? "Sua opinião é muito importante..." : "Como foi seu atendimento?"}
                className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-3 focus:ring-1 focus:ring-[#80d6d1] focus:border-[#80d6d1] transition-all resize-none outline-none text-gray-800"
              />
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Section 2 */}
          <div className="text-center space-y-3">
            <h2 className="text-lg font-black text-gray-900">
              {type === 'evento' ? 'Avaliar organizadores' : 'Avalie o barraqueiro'}
            </h2>
            
            {/* Secondary Stars */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button 
                  type="button"
                  key={s}
                  onClick={() => setStarsSec(s)}
                  className="p-1 cursor-pointer transform active:scale-125 transition-transform"
                >
                  <LucideIcon 
                    name="Star" 
                    size={32} 
                    className={s <= starsSec ? 'text-[#006a66] fill-current' : 'text-gray-300'} 
                  />
                </button>
              ))}
            </div>

            {/* Extra Comment Area */}
            <div className="text-left">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Fale mais sobre a sua experiência:
              </label>
              <textarea 
                rows={3}
                value={commentSec}
                onChange={(e) => setCommentSec(e.target.value)}
                placeholder={type === 'evento' ? "Como foi o atendimento dos organizadores?" : "O que achou do atendimento pessoal?"}
                className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 p-3 focus:ring-1 focus:ring-[#80d6d1] focus:border-[#80d6d1] transition-all resize-none outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            className="w-full bg-[#80d6d1] hover:bg-[#006a66] hover:text-white text-gray-950 font-black py-4.5 rounded-full shadow-lg active:scale-95 transition-all cursor-pointer text-sm uppercase tracking-wide"
          >
            Enviar Avaliação
          </button>
        </form>
      </motion.div>
    </div>
  );
};


// --- SCREEN 10: USER APPOINTMENTS LIST ("Confira seus agendamentos") ---
interface AppointmentsProps {
  onNavigate: (screen: string) => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onExplore: () => void;
}

export const AppointmentsScreen: React.FC<AppointmentsProps> = ({ 
  onNavigate, 
  appointments, 
  onCancelAppointment,
  onExplore
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'Todas' | 'Restaurantes' | 'Bares' | 'Autônomos'>('Todas');

  const filteredAppointments = appointments.filter(app => {
    if (selectedFilter === 'Todas') return true;
    return app.category === selectedFilter;
  });

  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-900 overflow-y-auto no-scrollbar pb-32 flex flex-col justify-between">
      <div>
        <header className="sticky top-0 z-10 bg-[#fbf9f8] flex justify-between items-center w-full px-4 py-4 border-b border-gray-100">
          <button 
            onClick={() => onNavigate('map')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95 cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={20} />
          </button>
          
          <h1 className="text-base font-extrabold tracking-tight text-center">Agenda de Experiências</h1>

          <div className="w-10 h-10 rounded-full border-2 border-[#80d6d1] overflow-hidden">
            <img src={IMAGES.userProfile} alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </header>

        <main className="p-4 flex-grow">
          <div className="mb-4">
            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">
              Confira seus agendamentos
            </h1>
            <p className="text-xs text-gray-400">Suas reservas e compromissos confirmados na orla</p>
          </div>

          {/* Categories Horizontal filters */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-6 py-1">
            {(['Todas', 'Restaurantes', 'Bares', 'Autônomos'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.8 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${selectedFilter === filter ? 'bg-[#00201f] text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 p-6 flex flex-col items-center">
                <LucideIcon name="Calendar" size={36} className="text-gray-300 mb-2" />
                <p className="text-xs font-bold text-gray-500">Nenhum compromisso agendado para esta categoria</p>
                <button 
                  onClick={onExplore}
                  className="mt-3 bg-[#80d6d1] hover:bg-[#006a66] hover:text-white text-gray-950 font-bold px-4 py-2 rounded-full text-[11px] uppercase cursor-pointer"
                >
                  Explorar Atividades
                </button>
              </div>
            ) : (
              filteredAppointments.map((app) => {
                const isPromo = app.title.includes('Peixada');
                return (
                  <motion.article 
                    layout
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    key={app.id}
                    className={`p-4 rounded-xl shadow-sm border flex gap-4 transition-all ${isPromo ? 'bg-white border-gray-200' : 'bg-[#fdf8f4] border-orange-100'}`}
                  >
                    {/* Icon container */}
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${isPromo ? 'bg-[#80d6d1]/15 text-[#006a6a]' : 'bg-orange-50 text-orange-500'}`}>
                      <LucideIcon name={app.title.includes('Peixada') ? 'Fish' : 'Music'} size={24} />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-extrabold text-sm text-gray-800 flex items-center gap-1">
                            {app.title}
                          </h3>
                          <div className="text-[11px] text-gray-500 mt-1 space-y-0.5">
                            <span className="flex items-center gap-1">
                              <LucideIcon name="Calendar" size={10} />
                              <span>{app.date}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <LucideIcon name="MapPin" size={10} />
                              <span>{app.location}</span>
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-1 items-end">
                          <button 
                            onClick={() => alert(`Localizando "${app.title}"... Evento situado no Cupe!`)}
                            className="bg-[#80d6d1] text-gray-900 px-3 py-1.5 rounded-lg text-[10px] font-black cursor-pointer uppercase transition-transform"
                          >
                            Localizar
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm('Deseja cancelar este agendamento?')) {
                                onCancelAppointment(app.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-700 py-1 px-1.5 font-bold text-[10px] uppercase block underline"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>

                      {/* Promo info or dynamic notes */}
                      <div className={`mt-3 pt-3 border-t border-dashed ${isPromo ? 'border-gray-200 text-gray-700' : 'border-orange-200 text-orange-800'}`}>
                        <p className="text-[11px] font-bold">{app.organizer}</p>
                        <p className="text-[10px] opacity-75">{app.price}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <LucideIcon name="Star" className="text-yellow-500" size={10} fill="currentColor" />
                          <span className="text-[9px] font-extrabold">{app.rating}</span>
                          <span className="text-[9px] opacity-75">({app.reviewsCount})</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            )}
          </div>
        </main>
      </div>

      <BottomTabNav activeScreen="appointments" onNavigate={onNavigate} />
    </div>
  );
};


// --- SCREEN 11: EVENTS & SERVICES SPLIT (PARTICIPE DOS NOSSOS EVENTOS / SERVIÇOS) ---
interface EventsServicesProps {
  onNavigate: (screen: string) => void;
  onSelectActivity: (id: string, type: 'evento' | 'servico') => void;
  initialTab: 'eventos' | 'servicos';
  activities?: LocalActivity[];
}

export const EventsAndServicesScreen: React.FC<EventsServicesProps> = ({ 
  onNavigate, 
  onSelectActivity, 
  initialTab,
  activities 
}) => {
  const [activeTab, setActiveTab] = useState<'eventos' | 'servicos'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = activeTab === 'eventos'
    ? ['Todas', 'Surf', 'Geral', 'Caminhada']
    : ['Todas', 'Restaurantes', 'Bares', 'Autônomos'];

  const filteredActivities = (activities || ACTIVITIES).filter(a => {
    if (a.type !== (activeTab === 'eventos' ? 'evento' : 'servico')) return false;
    if (selectedCategory === 'Todas') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-900 overflow-y-auto no-scrollbar pb-32">
      {/* Top Header toggle selector */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex justify-between items-center w-full px-4 py-3 border-b border-gray-100">
        <button 
          onClick={() => onNavigate('map')}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer transition-transform duration-150"
        >
          <LucideIcon name="ArrowLeft" size={18} />
        </button>

        {/* Tab switch bar */}
        <div className="flex bg-gray-100 rounded-full p-1 shadow-sm">
          <button 
            onClick={() => { setActiveTab('eventos'); setSelectedCategory('Todas'); }}
            className={`px-5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${activeTab === 'eventos' ? 'text-[#006a66] font-bold bg-[#80d6d1]' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Eventos
          </button>
          
          <button 
            onClick={() => { setActiveTab('servicos'); setSelectedCategory('Todas'); }}
            className={`px-5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${activeTab === 'servicos' ? 'text-[#006a66] font-bold bg-[#80d6d1]' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Serviços
          </button>
        </div>

        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
          <img src={IMAGES.userProfile} alt="User avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      <main className="px-4 pt-4">
        {/* Descriptive Title */}
        <div className="mb-6">
          <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">
            {activeTab === 'eventos' ? 'Participe dos nossos eventos' : 'Participe dos nossos serviços'}
          </h1>
          <p className="text-xs text-gray-500">Aproveite as maiores festividades e ofertas gastronômicas da região!</p>
        </div>

        {/* Categories dynamic selector row */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-1.8 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat ? 'bg-[#80d6d1] text-gray-950 shadow-sm' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal list of items */}
        <div className="space-y-4">
          {filteredActivities.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative border border-gray-100 flex gap-4"
            >
              {/* Image box */}
              <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/5" />
              </div>

              <div className="flex-grow pr-10">
                <h3 className="font-extrabold text-[#006a66] text-sm mb-1">{item.title}</h3>
                
                <div className="space-y-0.5 text-[10px] text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <LucideIcon name="Calendar" size={11} />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideIcon name="MapPin" size={11} />
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="text-[11px] leading-tight mb-2">
                  <span className="font-bold text-gray-800">{item.organizer}</span>
                  <p className="text-gray-500">{item.price}</p>
                </div>

                <div className="flex items-center gap-1 text-[11px]">
                  <LucideIcon name="Star" size={12} className="text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-800">{item.rating}</span>
                  <span className="text-gray-400">({item.reviewsCount})</span>
                </div>
              </div>

              {/* Float side trigger button */}
              <button 
                onClick={() => onSelectActivity(item.id, item.type)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#80d6d1] text-gray-950 font-black px-4 py-2 rounded-lg text-[10px] uppercase cursor-pointer hover:bg-[#68bbae] active:scale-95 transition-all shadow-sm"
              >
                {activeTab === 'eventos' ? 'Ver' : 'Localizar'}
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomTabNav activeScreen="events_services" onNavigate={onNavigate} />
    </div>
  );
};
