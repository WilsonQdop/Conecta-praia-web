import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { LocalActivity, Appointment, Review } from '../types';
import { ACTIVITIES, IMAGES } from '../data';
import { authService, PostEventResponseDTO, postEventService, PostServiceResponseDTO, postServiceService, registeredService, ReviewResponseDTO, reviewService, subscriptionService, touristService, uploadService } from '../services/api';
import { adminService} from '../services/api';

// =================================================================
// 🧭 COMPONENTE: BOTTOM TAB NAV BAR (COMPARTILHADO)
// =================================================================
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

// =================================================================
// 🔍 TELA: TOURIST SEARCH SCREEN (BUSCA - MAPA)
// =================================================================
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
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.searchMap})` }}
      />

      <header className="absolute top-4 left-0 w-full z-10 px-4">
        <div className="flex items-center gap-2 pt-2">
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
          <button 
            onClick={() => {
              if (filterType === 'tudo') setFilterType('eventos');
              else if (filterType === 'eventos') setFilterType('servicos');
              else setFilterType('tudo');
            }}
            className="bg-[#80d6d1] text-white w-11 h-11 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <LucideIcon name="SlidersHorizontal" size={18} />
          </button>
        </div>

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

      <div className="absolute inset-0 z-5 pointer-events-none">
        {filteredPins.map((a) => {
          let top = '30%';
          let left = '50%';
          if (a.id === 'act-1') { top = '25%'; left = '20%'; }
          if (a.id === 'act-2') { top = '50%'; left = '45%'; }
          if (a.id === 'act-4') { top = '70%'; left = '60%'; }
          if (a.id === 'act-5') { top = '40%'; left = '75%'; }
          if (a.id === 'act-6') { top = '15%'; left = '65%'; }

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

// =================================================================
// 🗺️ TELA: INTERACTIVE MAP OVERVIEW (MAPA INTERATIVO PRINCIPAL)
// =================================================================
interface InteractiveMapProps {
  onNavigate: (screen: string) => void;
  onSelectActivity: (id: string, type: 'evento' | 'servico') => void;
  activities?: LocalActivity[];
}

export const InteractiveMapScreen: React.FC<InteractiveMapProps> = ({ onNavigate, onSelectActivity, activities }) => {
  return (
    <div className="relative w-full h-full text-gray-900 bg-[#fbf9f8] overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.interactiveMap})` }}
      />

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

      <div className="absolute inset-0 z-5 pointer-events-none">
        <div onClick={() => onSelectActivity('act-2', 'evento')} className="absolute top-[20%] left-[55%] pointer-events-auto cursor-pointer flex flex-col items-center">
          <div className="bg-white/95 px-2 py-1 rounded shadow-md mb-1 border border-pink-100">
            <span className="text-[9px] font-extrabold text-pink-500">Enotel Festival</span>
          </div>
          <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white marker-pulse shadow-lg" />
        </div>

        <div onClick={() => onSelectActivity('act-4', 'servico')} className="absolute top-[45%] left-[30%] pointer-events-auto cursor-pointer flex flex-col items-center">
          <div className="bg-white/95 px-2 py-1 rounded shadow-md mb-1 border border-pink-100">
            <span className="text-[9px] font-extrabold text-pink-500">Ruda Peixada</span>
          </div>
          <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white marker-pulse shadow-lg" />
        </div>

        <div onClick={() => onSelectActivity('act-1', 'evento')} className="absolute top-[68%] left-[45%] pointer-events-auto cursor-pointer flex flex-col items-center">
          <div className="bg-white/95 px-2 py-1 rounded shadow-md mb-1 border border-pink-100">
            <span className="text-[9px] font-extrabold text-pink-500">Surf estilo de vida</span>
          </div>
          <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white marker-pulse shadow-lg" />
        </div>
      </div>

      <BottomTabNav activeScreen="map" onNavigate={onNavigate} />
    </div>
  );
};

// =================================================================
// 🎫 TELA: EVENTS AND SERVICES HUB (MURAL DE EVENTOS E SERVIÇOS)
// =================================================================
interface EventsAndServicesProps {
  onNavigate: (screen: string) => void;
  onSelectActivity: (id: string, type: 'evento' | 'servico') => void;
  activities?: LocalActivity[];
}



interface EventsAndServicesProps {
  onNavigate: (screen: string) => void;
  onSelectActivity: (id: string, type: 'evento' | 'servico') => void;
}

export const EventsAndServicesScreen: React.FC<EventsAndServicesProps> = ({ onNavigate, onSelectActivity }) => {
  const [filter, setFilter] = useState<'tudo' | 'evento' | 'servico'>('tudo');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // ════════════════════════════════════════════════════════════════
  // 📥 CARREGAR ATIVIDADES DO BANCO DE DADOS (AGORA VIA ADMIN SERVICE)
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('[TOURIST_MURAL] Buscando dados reais da API...');

        // Executa as duas requisições em paralelo no backend liberado
        const [servicesData, eventsData] = await Promise.all([
          adminService.getAllServices(),
          adminService.getAllEvents()
        ]);

        // Normaliza os SERVIÇOS do backend para o formato que o card do Turista espera
        const normalizedServices = servicesData.map((s: any) => ({
          id: s.id,
          type: 'servico',
          title: s.title,
          organizer: s.entrepreneurName,
          price: s.valueDescription || `R$ ${s.value || '0,00'}`,
          details: s.description,
          date: new Date(s.createdAt).toLocaleDateString('pt-BR'),
          location: s.location
        }));

        // Normaliza os EVENTOS do backend para o formato que o card do Turista espera
        const normalizedEvents = eventsData.map((e: any) => ({
          id: e.id,
          type: 'evento',
          title: e.title,
          organizer: e.entrepreneurName,
          price: e.valueDescription || `R$ ${e.value || '0,00'}`,
          details: e.description,
          date: new Date(e.dateHour || e.createdAt).toLocaleDateString('pt-BR'),
          location: e.location
        }));

        // Junta tudo no estado local
        setItems([...normalizedServices, ...normalizedEvents]);
      } catch (err: any) {
        console.error('[TOURIST_MURAL] ❌ Erro ao buscar atividades:', err);
        setError(err.response?.data?.message || 'Erro ao carregar o mural local de atividades.');
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  // ════════════════════════════════════════════════════════════════
  // 🔄 FILTRAGEM DINÂMICA
  // ════════════════════════════════════════════════════════════════
  const filteredItems = useMemo(() => {
    if (filter === 'tudo') return items;
    return items.filter(item => item.type === filter);
  }, [filter, items]);

  // ════════════════════════════════════════════════════════════════
  // 🎨 RENDERING
  // ════════════════════════════════════════════════════════════════
  return (
    <div className="w-full h-full text-gray-900 bg-[#fbf9f8] overflow-y-auto no-scrollbar pb-32">
      
      {/* Header fixo */}
      <header className="sticky top-0 bg-[#fbf9f8]/90 backdrop-blur-md z-10 px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-black tracking-widest text-[#006a66] uppercase">Mural Local</span>
          <h1 className="text-xl font-black text-gray-900">Atividades e Serviços</h1>
        </div>
        <div className="bg-[#80d6d1]/20 p-2 rounded-full text-[#006a66]">
          <LucideIcon name="Ticket" size={20} />
        </div>
      </header>

      {/* Botões de Filtro */}
      <div className="px-6 my-4 flex gap-2 overflow-x-auto no-scrollbar">
        {([
          { id: 'tudo', label: 'Tudo' },
          { id: 'evento', label: 'Eventos' },
          { id: 'servico', label: 'Serviços' }
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === tab.id ? 'bg-[#006a66] text-white shadow-sm' : 'bg-white border border-gray-100 text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exibição de Estados (Loading, Erro ou Lista Vazia) */}
      <div className="px-6 space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006a66] mx-auto mb-3"></div>
            <p className="text-xs text-gray-500 font-medium">Buscando novidades em Porto de Galinhas...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-red-700 font-bold">⚠️ {error}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
            <LucideIcon name="Inbox" size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-400">Nenhuma atividade disponível no momento.</p>
          </div>
        ) : (
          // Renderização da lista dinâmica vinda diretamente do banco
          filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectActivity(item.id, item.type)}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] cursor-pointer hover:border-gray-200 transition-all flex flex-col justify-between active:scale-[0.99]"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                    item.type === 'evento' ? 'bg-purple-50 text-purple-600' : 'bg-teal-50 text-[#006a66]'
                  }`}>
                    {item.type === 'evento' ? 'EVENTO' : 'SERVIÇO'}
                  </span>
                  <h4 className="text-sm font-black text-gray-900 pt-1">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 font-medium">por {item.organizer}</p>
                </div>
                <span className="text-xs font-black text-[#006a66]">{item.price}</span>
              </div>

              <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">{item.details}</p>

              <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50 text-[11px] text-gray-500 font-semibold">
                <div className="flex items-center gap-1">
                  <LucideIcon name="Calendar" size={12} />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <LucideIcon name="MapPin" size={12} />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomTabNav activeScreen="events_services" onNavigate={onNavigate} />
    </div>
  );
};

// =================================================================
// 🏄‍♂️ TELA: EVENT DETAILS (DETALHES DO EVENTO)
// =================================================================
export const EventDetailScreen: React.FC<EventDetailProps> = ({
  activityId, onBack, onNavigate, onEvaluate, onRegisterAppointment, isFavorited, onToggleFavorite
}) => {
  const [eventData, setEventData] = React.useState<PostEventResponseDTO | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [reviews, setReviews] = useState<ReviewResponseDTO[]>([]);

  React.useEffect(() => {
    adminService.getAllEvents()
      .then(events => {
        const found = events.find(e => e.id === activityId);
        setEventData(found || null);
      })
      .catch(() => setEventData(null))
      .finally(() => setLoading(false));
  }, [activityId]);

  React.useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await reviewService.getEventReviews(activityId);
        setReviews(data);
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
      }
    };
    if (activityId) loadReviews();
  }, [activityId]);

  if (loading) return (
    <div className="w-full h-full bg-[#fbf9f8] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006a66]" />
    </div>
  );

  if (!eventData) return (
    <div className="w-full h-full bg-[#fbf9f8] flex items-center justify-center">
      <p className="text-xs text-gray-400">Evento não encontrado.</p>
    </div>
  );

  return (
    <div className="relative w-full h-full text-gray-900 bg-[#fbf9f8] overflow-y-auto no-scrollbar pb-32">
      
      <header className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-between items-center">
        <button onClick={() => onNavigate('events_services')} className="bg-white/95 p-2 rounded-full shadow-md cursor-pointer">
          <LucideIcon name="ArrowLeft" size={20} />
        </button>
        <button onClick={() => onToggleFavorite(activityId)} className="bg-white/95 p-2 rounded-full shadow-md cursor-pointer">
          <LucideIcon name="Heart" size={18} className={isFavorited ? "text-red-500 fill-current" : "text-gray-700"} />
        </button>
      </header>

      <section className="h-[280px] w-full relative bg-gray-200">
        <img
          src={eventData.imageUrl || IMAGES.surfMapDetail}
          alt={eventData.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = IMAGES.surfMapDetail; }}
        />
        <div className="absolute bottom-4 left-4">
          <span className="bg-purple-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
            {eventData.eventType}
          </span>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-4">
        <div className="bg-white rounded-t-[32px] shadow-2xl p-6">
          
          <h1 className="text-2xl font-black text-gray-900 text-center mb-1">{eventData.title}</h1>
          <p className="text-xs text-center text-gray-400 font-semibold mb-6">por {eventData.entrepreneurName}</p>

          <div className="bg-[#f7f3e9] rounded-2xl p-5 space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#80d6d1]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideIcon name="MapPin" size={14} className="text-[#006a66]" />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Local</p>
                <p className="text-xs font-bold text-gray-800">{eventData.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#80d6d1]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideIcon name="Calendar" size={14} className="text-[#006a66]" />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Data</p>
                <p className="text-xs font-bold text-gray-800">
                  {new Date(eventData.dateHour || eventData.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#80d6d1]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideIcon name="DollarSign" size={14} className="text-[#006a66]" />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Valor</p>
                <p className="text-xs font-bold text-gray-800">{eventData.valueDescription}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Descrição</p>
            <p className="text-xs text-gray-600 leading-relaxed">{eventData.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-black mb-3">Avaliações ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="text-xs text-gray-400">Nenhuma avaliação ainda.</p>
            ) : (
              reviews.map(r => (
                <div key={r.id} className="bg-gray-50 rounded-xl p-3 mb-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-xs">{r.userName}</span>
                    <div className="flex">
                      {[1,2,3,4,5].map(s => (
                        <LucideIcon key={s} name="Star" size={12} className={s <= r.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{r.comment}</p>
                  <p className="text-[9px] text-gray-400 mt-1">{new Date(r.date).toLocaleDateString('pt-BR')}</p>
                </div>
              ))
            )}
          </div>

          <button
            onClick={async () => {
              try {
                await subscriptionService.subscribeToEvent(eventData.id);
                alert('Agendamento realizado! Veja em Reservas.');
              } catch (e: any) {
                alert(e.response?.data?.message || 'Erro ao agendar');
              }
            }}
            className="w-full bg-[#006a66] text-white font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wide cursor-pointer"
          >
            Agendar
          </button>
          <button
            onClick={() => setShowRatingModal(true)}
            className="w-full bg-[#80d6d1] text-gray-900 font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wide cursor-pointer mt-3"
          >
            Avaliar Evento
          </button>
        </div>
      </section>

          {showRatingModal && (
          <RatingModal
            type="evento"
            onClose={() => setShowRatingModal(false)}
            onSubmit={async (stars, comment) => {
  try {
    await reviewService.reviewEvent(eventData.id, { rating: stars, comment });
    alert('Avaliação enviada com sucesso!');
    
    // ⭐ RECARREGA AS AVALIAÇÕES AQUI ⭐
    const novasReviews = await reviewService.getEventReviews(eventData.id);
    setReviews(novasReviews);
    
    setShowRatingModal(false);
  } catch (error: any) {
    alert(error.response?.data?.message || 'Erro ao enviar avaliação');
  }
}}
          />
        )}
        
      <BottomTabNav activeScreen="map" onNavigate={onNavigate} />
    </div>
  );
};

// =================================================================
// 🦐 TELA: SERVICE DETAILS (DETALHES DO SERVIÇO)
// =================================================================
export const ServiceDetailScreen: React.FC<ServiceDetailProps> = ({
  activityId, onBack, onNavigate, onEvaluate, onAddReminder, isFavorited, onToggleFavorite
}) => {
  const [serviceData, setServiceData] = React.useState<PostServiceResponseDTO | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [reviews, setReviews] = useState<ReviewResponseDTO[]>([]);
  const [showRatingModal, setShowRatingModal] = useState(false);

  React.useEffect(() => {
    adminService.getAllServices()
      .then(services => {
        const found = services.find(s => s.id === activityId);
        setServiceData(found || null);
      })
      .catch(() => setServiceData(null))
      .finally(() => setLoading(false));
  }, [activityId]);

 React.useEffect(() => {
  const loadReviews = async () => {
    try {
      console.log('[DEBUG] Carregando avaliações para o serviço ID:', activityId);
      const data = await reviewService.getServiceReviews(activityId);
      console.log('[DEBUG] Avaliações recebidas:', data);
      setReviews(data);
    } catch (error) {
      console.error('[DEBUG] Erro ao carregar avaliações:', error);
    }
  };
  if (activityId) {
    loadReviews();
  }
}, [activityId]);

  if (loading) return (
    <div className="w-full h-full bg-[#fbf9f8] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006a66]" />
    </div>
  );

  if (!serviceData) return (
    <div className="w-full h-full bg-[#fbf9f8] flex items-center justify-center">
      <p className="text-xs text-gray-400">Serviço não encontrado.</p>
    </div>
  );

  return (
    <div className="relative w-full h-full text-gray-900 bg-[#fbf9f8] overflow-y-auto no-scrollbar pb-32">

      <header className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-between items-center">
        <button onClick={() => onNavigate('events_services')} className="bg-white/95 p-2 rounded-full shadow-md cursor-pointer">
          <LucideIcon name="ArrowLeft" size={20} />
        </button>
        <button onClick={() => onToggleFavorite(activityId)} className="bg-white/95 p-2 rounded-full shadow-md cursor-pointer">
          <LucideIcon name="Heart" size={18} className={isFavorited ? "text-red-500 fill-current" : "text-gray-700"} />
        </button>
      </header>

      <section className="h-[280px] w-full relative bg-gray-200">
        <img
          src={serviceData.imageUrl || IMAGES.peixadaMapDetail}
          alt={serviceData.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = IMAGES.peixadaMapDetail; }}
        />
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#006a66] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
            {serviceData.serviceType}
          </span>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-4">
        <div className="bg-white rounded-t-[32px] shadow-2xl p-6">

          <h1 className="text-2xl font-black text-gray-900 text-center mb-1">{serviceData.title}</h1>
          <p className="text-xs text-center text-gray-400 font-semibold mb-6">por {serviceData.entrepreneurName}</p>

          <div className="bg-[#f7f3e9] rounded-2xl p-5 space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#80d6d1]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideIcon name="MapPin" size={14} className="text-[#006a66]" />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Local</p>
                <p className="text-xs font-bold text-gray-800">{serviceData.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#80d6d1]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideIcon name="Calendar" size={14} className="text-[#006a66]" />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Data</p>
                <p className="text-xs font-bold text-gray-800">
                  {new Date(serviceData.dateHour || serviceData.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#80d6d1]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <LucideIcon name="DollarSign" size={14} className="text-[#006a66]" />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase">Valor</p>
                <p className="text-xs font-bold text-gray-800">{serviceData.valueDescription}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Descrição</p>
            <p className="text-xs text-gray-600 leading-relaxed">{serviceData.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-black mb-3">Avaliações ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="text-xs text-gray-400">Nenhuma avaliação ainda.</p>
            ) : (
              reviews.map(r => (
                <div key={r.id} className="bg-gray-50 rounded-xl p-3 mb-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-xs">{r.userName}</span>
                    <div className="flex">
                      {[1,2,3,4,5].map(s => (
                        <LucideIcon key={s} name="Star" size={12} className={s <= r.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{r.comment}</p>
                  <p className="text-[9px] text-gray-400 mt-1">{new Date(r.date).toLocaleDateString('pt-BR')}</p>
                </div>
              ))
            )}
          </div>

          <button
           onClick={async () => {
              try {
                console.log('[DEBUG] Tentando se inscrever em:', serviceData.id);
                await subscriptionService.subscribeToService(serviceData.id);
                console.log('[DEBUG] Inscrição realizada com sucesso!');
                alert('Inscrição realizada! Veja em Reservas.');
              } catch (e: any) {
                console.error('[ERROR] Erro ao se inscrever:', e);
                console.error('[ERROR] Response:', e.response?.data);
                alert(e.response?.data?.message || 'Erro ao se inscrever');
              }
                      }}
                      className="w-full bg-[#006a66] text-white font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wide cursor-pointer"
                    >
                      Inscrever
                    </button>

                    <button
            onClick={() => setShowRatingModal(true)}
            className="w-full bg-[#80d6d1] text-gray-900 font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wide cursor-pointer mt-3"
          >
            Avaliar Serviço
          </button>
        </div>
      </section>
      {showRatingModal && (
      <RatingModal
        type="servico"
        onClose={() => setShowRatingModal(false)}
        onSubmit={async (stars, comment) => {
          try {
    await reviewService.reviewService(serviceData.id, { rating: stars, comment });
    alert('Avaliação enviada com sucesso!');
    
    // ⭐ RECARREGA AS AVALIAÇÕES AQUI ⭐
    const novasReviews = await reviewService.getServiceReviews(serviceData.id);
    setReviews(novasReviews);
    
    setShowRatingModal(false);
  } catch (error: any) {
    alert(error.response?.data?.message || 'Erro ao enviar avaliação');
  }
        }}
      />
    )}

      <BottomTabNav activeScreen="map" onNavigate={onNavigate} />
    </div>
  );
};

// =================================================================
// ⭐ MODAL: DECORATIVE RATING MODAL OVERLAY
// =================================================================
interface RatingModalProps {
  type: 'evento' | 'servico';
  onClose: () => void;
  onSubmit: (starsMain: number, commentMain: string, starsSec: number, commentSec: string) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ type, onClose, onSubmit }) => {
  const [starsMain, setStarsMain] = useState(0);
  const [starsSec, setStarsSec] = useState(0);
  const [commentMain, setCommentMain] = useState('');
  const [commentSec, setCommentSec] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-sm rounded-[28px] p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto text-gray-900">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 bg-gray-100 rounded-full cursor-pointer"><LucideIcon name="X" size={16} /></button>
        <div className="space-y-6 pt-2">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-black">Avaliar atividade</h2>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} type="button" onClick={() => setStarsMain(s)} className="p-1 cursor-pointer">
                  <LucideIcon name="Star" size={28} className={s <= starsMain ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                </button>
              ))}
            </div>
            <textarea rows={2} value={commentMain} onChange={e => setCommentMain(e.target.value)} placeholder="Deixe seu comentário..." className="w-full text-xs rounded-xl border p-2 outline-none" />
          </div>
          <button onClick={() => onSubmit(starsMain, commentMain, starsSec, commentSec)} className="w-full bg-[#80d6d1] font-black py-3 rounded-full text-xs uppercase cursor-pointer">Enviar</button>
        </div>
      </motion.div>
    </div>
  );
};

// =================================================================
// 📅 TELA: USER APPOINTMENTS LIST (INTEGRADA AO BACKEND)
// =================================================================
interface AppointmentsProps {
  onNavigate: (screen: string) => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onExplore: () => void;
}

export const AppointmentsScreen: React.FC<AppointmentsProps> = ({ onNavigate, appointments, onCancelAppointment, onExplore }) => {
  const [selectedFilter, setSelectedFilter] = useState<'Todas' | 'Eventos' | 'Serviços'>('Todas');
  const [loading, setLoading] = useState(true);
  const [registeredItems, setRegisteredItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRegisteredItems = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('[APPOINTMENTS] Carregando inscrições do turista...');

        const [eventsResponse, servicesResponse] = await Promise.all([
          registeredService.listMyRegisteredEvents(),
          registeredService.listMyRegisteredServices()
        ]);

        const eventsData = eventsResponse.map((evt: any) => ({
          id: evt.id,
          title: evt.title,
          type: 'Eventos',
          icon: 'Ticket' as const,
          date: new Date(evt.dateHour || evt.createdAt).toLocaleDateString('pt-BR'),
          location: evt.location,
          organizer: evt.entrepreneurName,
          price: evt.valueDescription || `R$ ${evt.value}`,
          eventType: evt.eventType
        }));

        const servicesData = servicesResponse.map((srv: any) => ({
          id: srv.id,
          title: srv.title,
          type: 'Serviços',
          icon: 'Briefcase' as const,
          date: new Date(srv.dateHour || srv.createdAt).toLocaleDateString('pt-BR'),
          location: srv.location,
          organizer: srv.entrepreneurName,
          price: srv.valueDescription || `R$ ${srv.value}`,
          serviceType: srv.serviceType
        }));

        setRegisteredItems([...eventsData, ...servicesData]);
        console.log('[APPOINTMENTS] Total de inscrições:', eventsData.length + servicesData.length);
      } catch (err: any) {
        console.error('[APPOINTMENTS] Erro ao carregar:', err);
        setError(err.response?.data?.message || 'Erro ao carregar suas inscrições');
      } finally {
        setLoading(false);
      }
    };
    loadRegisteredItems();
  }, []);

  const filteredItems = registeredItems.filter(item => 
    selectedFilter === 'Todas' ? true : item.type === selectedFilter
  );

  const handleCancelAppointment = async (id: string, type: 'Eventos' | 'Serviços') => {
  if (window.confirm('Tem certeza que deseja cancelar esta inscrição?')) {
    try {
      console.log('[CANCEL] Cancelando', type, 'com ID:', id);
      
      // Chama o endpoint correto baseado no tipo
      if (type === 'Eventos') {
        await registeredService.cancelEventRegistration(id);
      } else {
        await registeredService.cancelServiceRegistration(id);
      }
      
      // Remove do estado local
      setRegisteredItems(prev => prev.filter(i => i.id !== id));
      alert('Inscrição cancelada com sucesso!');
    } catch (error: any) {
      console.error('[CANCEL] Erro:', error);
      alert(error.response?.data?.message || 'Erro ao cancelar inscrição');
    }
  }
};

  return (
    <div className="w-full h-full text-gray-900 bg-[#fbf9f8] overflow-y-auto no-scrollbar pb-32">
      {/* Header fixo */}
      <header className="sticky top-0 bg-[#fbf9f8]/90 backdrop-blur-md z-10 px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#006a66] uppercase">Turista</span>
            <h1 className="text-xl font-black text-gray-900">Minhas Inscrições</h1>
          </div>
          <div className="bg-[#80d6d1]/20 p-2 rounded-full text-[#006a66]">
            <LucideIcon name="CalendarCheck" size={20} />
          </div>
        </div>

        {/* Botões de Filtro */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {(['Todas', 'Eventos', 'Serviços'] as const).map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === f
                  ? 'bg-[#006a66] text-white shadow-sm'
                  : 'bg-white border border-gray-100 text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* Conteúdo */}
      <div className="px-6 space-y-4 mt-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006a66] mx-auto mb-3"></div>
            <p className="text-xs text-gray-400 font-medium">Carregando suas inscrições...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-red-700 font-bold">⚠️ {error}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
            <LucideIcon name="CalendarCheck" size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-400 mb-4">Nenhuma inscrição encontrada.</p>
            <button 
              onClick={onExplore}
              className="bg-[#80d6d1] text-white font-bold text-xs px-4 py-2 rounded-full cursor-pointer hover:bg-[#006a66] transition-colors"
            >
              Explorar Atividades
            </button>
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:border-gray-200 transition-all"
            >
              {/* Badge tipo */}
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                  item.type === 'Eventos'
                    ? 'bg-purple-50 text-purple-600'
                    : 'bg-teal-50 text-[#006a66]'
                }`}>
                  {item.type === 'Eventos' ? 'EVENTO' : 'SERVIÇO'}
                </span>
                <span className="text-xs font-black text-[#006a66]">{item.price}</span>
              </div>

              {/* Info */}
              <h4 className="text-sm font-black text-gray-900 mb-1">{item.title}</h4>
              <p className="text-[11px] text-gray-400 font-medium mb-3">por {item.organizer}</p>

              {/* Detalhes */}
              <div className="flex gap-3 mb-3 pt-3 border-t border-gray-50 text-[10px] text-gray-500 font-semibold">
                <div className="flex items-center gap-1">
                  <LucideIcon name="Calendar" size={12} />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <LucideIcon name="MapPin" size={12} />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              {/* Botão Cancelar */}
              <button
                onClick={() => handleCancelAppointment(item.id, item.type)}
                className="w-full text-red-500 border border-red-200 bg-red-50 hover:bg-red-500 hover:text-white text-xs font-bold py-2 rounded-xl cursor-pointer transition-all active:scale-[0.98]"
              >
                Cancelar Inscrição
              </button>
            </div>
          ))
        )}
      </div>

      <BottomTabNav activeScreen="appointments" onNavigate={onNavigate} />
    </div>
  );
};


interface TouristProfileProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  touristName?: string;
  touristAvatar?: string;
}

export const TouristProfileScreen: React.FC<TouristProfileProps> = ({ 
  onBack, 
  onLogout, 
  onNavigate,
  touristName = 'Viajante',
  touristAvatar
}) => {
  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-800 overflow-y-auto no-scrollbar pb-32 flex flex-col p-6">
      
      {/* Top Header */}
      <header className="pt-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-1 px-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors flex items-center gap-1 text-xs font-bold text-gray-800 cursor-pointer"
        >
          <LucideIcon name="ArrowLeft" size={12} />
          <span>Explorar</span>
        </button>
        
        <div className="text-[10px] font-black uppercase text-[#006a66] tracking-widest">
          Meu Perfil
        </div>
        <div className="w-8" />
      </header>

      {/* Perfil Identity (Estilo ADM) */}
      <section className="mt-10 flex items-center gap-6">
   <div className="w-24 h-24 rounded-full relative border-2 border-white shadow-inner overflow-hidden flex-shrink-0">
  {touristAvatar 
    ? <img src={touristAvatar} alt="Avatar" className="w-full h-full object-cover" />
    : <LucideIcon name="User" size={48} className="text-[#006a66]" />
  }
  <span className="absolute bottom-1 right-1 bg-[#006a66] text-white p-1.5 rounded-full border-2 border-[#fbf9f8] shadow-sm z-10">
    <LucideIcon name="MapPin" size={12} fill="currentColor" />
  </span>
</div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 leading-tight">
            {touristName}
          </h1>
          <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>TURISTA EXPLORADOR</span>
          </p>
        </div>
      </section>

      {/* Menu de Navegação (Estilo Dashboard) */}
      <nav className="mt-12 space-y-3.5">
        
        {/* Link para Favoritos */}
        <button 
          onClick={() => alert("Em breve: Sua lista de desejos em Porto!")}
          className="w-full text-left px-4 py-4 bg-white border border-gray-100 hover:border-[#80d6d1] rounded-2xl text-gray-800 font-black text-xs uppercase tracking-wide transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-lg">
              <LucideIcon name="Heart" size={16} fill="currentColor" />
            </div>
            <span>Meus Favoritos</span>
          </span>
          <LucideIcon name="ChevronRight" size={14} className="text-gray-300" />
        </button>

        {/* Atalho para Reservas */}
        <button 
          onClick={() => onNavigate('appointments')}
          className="w-full text-left px-4 py-4 bg-white border border-gray-100 hover:border-[#80d6d1] rounded-2xl text-gray-800 font-black text-xs uppercase tracking-wide transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
              <LucideIcon name="CalendarCheck" size={16} />
            </div>
            <span>Histórico de Reservas</span>
          </span>
          <LucideIcon name="ChevronRight" size={14} className="text-gray-300" />
        </button>

        {/* Botão de Editar Dados - Inserir no Perfil do Turista */}
<div className="px-6 mt-4">
  <button 
    onClick={() => onNavigate('update_tourist_profile')}
    className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold py-3 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-sm flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <LucideIcon name="UserCog" size={16} className="text-[#006a66]" />
      <span>Editar meus dados pessoais</span>
    </div>
    <LucideIcon name="ChevronRight" size={16} className="text-gray-400" />
  </button>
</div>

        {/* Ajuda/Suporte */}
        <button 
          onClick={() => alert("Abrindo chat de suporte...")}
          className="w-full text-left px-4 py-4 bg-white border border-gray-100 hover:border-[#80d6d1] rounded-2xl text-gray-800 font-black text-xs uppercase tracking-wide transition-all shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <LucideIcon name="HelpCircle" size={16} />
            </div>
            <span>Suporte e Ajuda</span>
          </span>
          <LucideIcon name="ChevronRight" size={14} className="text-gray-300" />
        </button>
      </nav>

      {/* Rodapé com Logout */}
      <footer className="mt-auto pt-10 flex flex-col items-center gap-4">
        <button 
          onClick={onLogout}
          className="w-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
        >
          <LucideIcon name="LogOut" size={14} />
          Sair da Conta
        </button>
        
        <button
          onClick={async () => {
            if (confirm('Tem certeza? Isso irá deletar TODOS os seus dados permanentemente!')) {
              try {
                await authService.deleteAccount();
                alert('Conta deletada com sucesso');
                localStorage.clear();
                window.location.reload();
              } catch (error: any) {
                alert(error.response?.data?.message || 'Erro ao deletar conta');
              }
            }
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer mt-4"
        >
          Excluir Minha Conta
        </button>
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
          Porto de Galinhas App • v1.0.4
        </p>
      </footer>
      
    </div>
  );
};

interface UpdateTouristProfileProps {
  onBack: () => void;
  currentName: string;
  currentEmail: string;
  currentAvatar?: string;
  onSave: (updatedData: { name: string; avatarUrl: string }) => void;
}

export const UpdateTouristProfileScreen: React.FC<UpdateTouristProfileProps> = ({
  onBack,
  currentName,
  currentEmail,
  currentAvatar,
  onSave,
}) => {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Troque o form por div e o button type="submit" por onClick
const handleSubmit = async () => {
  setLoading(true);
  try {
    let finalAvatarUrl = avatarUrl;

    if (selectedFile) {
      const uploadResult = await uploadService.uploadAvatar(selectedFile);
      finalAvatarUrl = uploadResult.imageUrl;
    }

    await touristService.updateProfile({
      name,
      password: password || undefined,
      avatarUrl: finalAvatarUrl
    });

    console.log('[DEBUG] onSave sendo chamado com:', { name, avatarUrl: finalAvatarUrl }); // ✅
    onSave({ name, avatarUrl: finalAvatarUrl });
    onBack();
  } catch (error: any) {
    alert(error.response?.data?.message || 'Erro ao atualizar perfil');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-900 overflow-y-auto no-scrollbar pb-32 flex flex-col p-6">
      {/* Header */}
      <header className="pt-2 flex items-center justify-between border-b border-gray-100 pb-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex items-center justify-center"
        >
          <LucideIcon name="ArrowLeft" size={20} className="text-gray-700" />
        </button>
        <h1 className="text-sm font-black text-gray-800 uppercase tracking-wide">Meus Dados Pessoais</h1>
        <div className="w-9" />
      </header>

      {/* Foto de Perfil do Turista */}
      <section className="mt-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  // ✅ Guarda o arquivo para upload
  setSelectedFile(file);
  
  // ✅ Mantém o preview local com base64
  const reader = new FileReader();
  reader.onloadend = () => setAvatarUrl(reader.result as string);
  reader.readAsDataURL(file);
}}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden group cursor-pointer"
              >
                <img src={avatarUrl} alt="Avatar Turista" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <LucideIcon name="Camera" size={18} className="text-white" />
                  <span className="text-white text-[9px] font-bold mt-1">Alterar</span>
                </div>
              </div>
              </div>
        <p className="text-[11px] font-bold text-[#006a66] uppercase tracking-wider mt-3">Alterar Foto de Perfil</p>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4 flex-grow">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">Nome</label>
          <div className="flex items-center gap-3">
            <LucideIcon name="User" size={16} className="text-gray-400" />
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-gray-800"
              required
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">E-mail</label>
          <div className="flex items-center gap-3">
            <LucideIcon name="Mail" size={16} className="text-gray-400" />
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-gray-800"
              required
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-1">Senha</label>
          <div className="flex items-center gap-3">
            <LucideIcon name="Lock" size={16} className="text-gray-400" />
            <input 
              type="password" 
              value={password}
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-gray-800"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#006a66] hover:bg-[#00524f] text-white font-extrabold py-4 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer mt-6"
        >
          {loading ? 'Salvando...' : 'Atualizar Perfil'}
        </button>
      </form>
    </div>
  );
};