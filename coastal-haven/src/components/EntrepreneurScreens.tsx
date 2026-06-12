import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { Review, UserRole } from '../types';
import { IMAGES } from '../data';
import { postServiceService, postEventService, PostServiceResponseDTO, PostEventResponseDTO } from '../services/api';
import React, { useState } from 'react';


// --- SCREEN 8: ENTREPRENEUR PROFILE (BARRACA CÉU AZUL) ---
interface EntrepreneurProfileProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  reviews: Review[];
  onLogout: () => void;
}

export const EntrepreneurProfileScreen: React.FC<EntrepreneurProfileProps> = ({
  onBack,
  onNavigate,
  reviews,
  onLogout,
}) => {
  // Calculate average rating dynamically based on review length to show true interactive craftsmanship!
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="w-full h-full bg-[#F8F4E8] text-gray-800 overflow-hidden flex flex-col justify-between p-0">
      <div className="flex-grow flex flex-col justify-start justify-items-stretch">

        {/* Back navigation */}
        <nav className="px-6 py-2">
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={22} className="text-gray-800" />
          </button>
        </nav>

        {/* Profile Info Summary */}
        <section className="px-8 py-4 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md relative">
            <img src={IMAGES.barracaLogo} alt="Barraca Céu Azul" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 leading-tight">
              Barraca Céu<br/>Azul
            </h1>
            <span className="text-[10px] bg-[#006a66]/20 text-[#006a66] font-extrabold px-2.5 py-0.5 rounded-full mt-1.5 inline-block">
              EMPREENDEDOR
            </span>
          </div>
        </section>

        {/* Grid Stats Block */}
        <section className="px-6 py-2 font-sans">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Card: Profile Score */}
            <article className="bg-[#CBCBC1] p-4 rounded-2xl flex flex-col items-center justify-between min-h-[140px] shadow-sm text-center">
              <h2 className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight">Nota do perfil</h2>
              <div className="flex items-center gap-2 py-1">
                <LucideIcon name="Star" size={28} className="text-yellow-400 fill-current" />
                <span className="text-3xl font-black text-gray-900">{avgRating}</span>
              </div>
              <div className="text-[10px] font-semibold text-gray-600">
                ({reviews.length} avaliações)
              </div>
            </article>

            {/* Botão de Configuração do Negócio - Atualizado para Navegação Dinâmica */}
            <div className="bg-[#CBCBC1] p-4 rounded-2xl flex flex-col items-center justify-between min-h-[140px] shadow-sm text-center">
              <h2 className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight">Configurações</h2>
              <div className="py-1">
                <LucideIcon name="Sliders" size={28} className="text-gray-700" />
              </div>
              <button 
                onClick={() => onNavigate('update_profile')} // 🌟 Ação de navegação adicionada aqui
                className="w-full bg-[#A9A9A0] hover:bg-gray-400/30 text-gray-900 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1"
              >
                Ajustar
              </button>
            </div>

            {/* Card: Reviews Today */}
            <article className="bg-[#CBCBC1] p-4 rounded-2xl flex flex-col items-center justify-between min-h-[140px] shadow-sm text-center">
              <h2 className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight">Avaliações do dia</h2>
              <span className="text-4xl font-black text-gray-900 py-1">{reviews.length}</span>
              <button 
                onClick={() => onNavigate('reviews_mgmt')}
                className="w-full bg-[#A9A9A0] hover:bg-gray-400/30 text-gray-900 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider"
              >
                Detalhes
              </button>
            </article>

            {/* Card: Services posted */}
            <article className="bg-[#CBCBC1] p-4 rounded-2xl flex flex-col items-center justify-between min-h-[140px] shadow-sm text-center">
              <h2 className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight">Serviços postados</h2>
              <span className="text-4xl font-black text-gray-900 py-1">1</span>
              <button 
                onClick={() => onNavigate('entrepreneur_services')}
                className="w-full bg-[#A9A9A0] hover:bg-gray-400/30 text-gray-900 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider"
              >
                Detalhes
              </button>
            </article>

          </div>
        </section>

        {/* Promo creation button */}
        <section className="px-6 pt-4">
          <button 
            onClick={() => onNavigate('create_activity')}
            className="w-full bg-[#006a66] hover:bg-[#00524f] text-white font-extrabold py-4 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <LucideIcon name="Plus" size={16} />
            <span>Criar Novo Serviço / Evento</span>
          </button>
        </section>
      </div>

      {/* Footer logouts */}
      <footer className="px-6 pb-6 flex flex-col items-center mt-auto flex-shrink-0">
        <button 
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-extrabold py-3.5 px-10 rounded-full shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
        >
          Sair do Perfil
        </button>
      </footer>
    </div>
  );
};


// --- SCREEN 9: REVIEWS MANAGEMENT (GERENCIAR AVALIAÇÕES) ---
interface ReviewsManagementProps {
  onBack: () => void;
  reviews: Review[];
  onDeleteReview: (id: string) => void;
}

export const ReviewsManagementScreen: React.FC<ReviewsManagementProps> = ({
  onBack,
  reviews,
  onDeleteReview,
}) => {
  return (
    <div className="w-full h-full bg-white text-gray-900 overflow-y-auto no-scrollbar pb-32 flex flex-col justify-between">
      <div>
        {/* Status bar */}
        <header className="sticky top-0 z-10 bg-white px-4 pt-4 pb-2 border-b border-gray-100">
          <div className="flex justify-between items-center text-xs font-semibold mb-3 select-none text-gray-400">
            <span>9:27</span>
            <div className="flex gap-1 items-center">
              <LucideIcon name="Wifi" size={13} />
              <LucideIcon name="Battery" size={13} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <LucideIcon name="ArrowLeft" size={20} className="text-gray-700" />
            </button>
            <h1 className="text-sm font-black text-gray-800 uppercase tracking-wide">Gerenciar Avaliações</h1>
            <div className="w-8" />
          </div>
        </header>

        {/* Dynamic Reviews stack list */}
        <main className="px-4 py-6 space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-12 p-6 border border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
              <LucideIcon name="Star" size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-xs font-bold uppercase tracking-wider">Zero Avaliações Restando</p>
              <p className="text-[10px] mt-1 text-gray-400">O seu perfil não possui avaliações no momento.</p>
            </div>
          ) : (
            reviews.map((r) => (
              <motion.article 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={r.id}
                className="bg-[#FDF8F1] rounded-2xl p-4 shadow-sm border border-orange-100 flex gap-4"
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                  <div className="w-14 h-14 rounded-xl bg-[#E6F0ED] border border-[#2D5A5E]/15 flex items-center justify-center">
                    <LucideIcon name="User" size={26} className="text-[#2D5A5E]" />
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <LucideIcon name="Star" size={12} className="text-yellow-400 fill-current" />
                    <span className="text-[10px] font-black text-gray-600">{r.rating}</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1.5">
                    <h2 className="font-extrabold text-gray-800 text-sm leading-tight">
                      {r.userName}
                    </h2>
                    <button 
                      onClick={() => {
                        if (confirm(`Excluir avaliação de "${r.userName}"?`)) {
                          onDeleteReview(r.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                      title="Excluir avaliação"
                    >
                      <LucideIcon name="Trash2" size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic pr-2">
                    "{r.comment}"
                  </p>
                  <span className="text-[8px] font-bold text-gray-400 block mt-2 text-right">
                    POSTADO EM: {r.date}
                  </span>
                </div>
              </motion.article>
            ))
          )}
        </main>
      </div>

      {/* iOS indication spacer */}
      <footer>
        <div className="pb-4 select-none pointer-events-none">
          <div className="w-32 h-1 bg-black rounded-full mx-auto opacity-15" />
        </div>
      </footer>
    </div>
  );
};


// --- SCREEN 10: ENTREPRENEUR SERVICES (SERVIÇOS DO EMPREENDEDOR) ---
interface EntrepreneurServicesProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  entrepreneurEmail: string;
}

export const EntrepreneurServicesScreen: React.FC<EntrepreneurServicesProps> = ({
  onBack,
  onNavigate,
  entrepreneurEmail,
}) => {
  const [services, setServices] = React.useState<PostServiceResponseDTO[]>([]);
  const [events, setEvents] = React.useState<PostEventResponseDTO[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<'Todos' | 'Serviços' | 'Eventos'>('Todos');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadEntrepreneurContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const myServices = await postServiceService.getMyServices();
        setServices(myServices);

        const myEvents = await postEventService.getMyEvents();
        setEvents(myEvents);

        setLoading(false);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message 
          || error.message 
          || 'Erro ao carregar seus serviços e eventos';
        
        setError(errorMessage);
        setLoading(false);
        setServices([]);
        setEvents([]);
      }
    };

    loadEntrepreneurContent();
  }, [entrepreneurEmail]);

  const filteredContent = React.useMemo(() => {
    if (selectedFilter === 'Serviços') return services;
    if (selectedFilter === 'Eventos') return events;
    
    return [
      ...services.map(s => ({ ...s, type: 'service' })),
      ...events.map(e => ({ ...e, type: 'event' }))
    ];
  }, [selectedFilter, services, events]);

  if (loading) {
    return (
      <div className="w-full h-full bg-[#fbf9f8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006a66] mx-auto mb-3"></div>
          <p className="text-xs text-gray-500">Carregando seus serviços...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-900 overflow-y-auto no-scrollbar pb-32 flex flex-col justify-between">
      <div>
        <header className="sticky top-0 z-10 bg-[#fbf9f8] flex justify-between items-center w-full px-4 py-4 border-b border-gray-100">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95 cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={20} />
          </button>
          <h1 className="text-base font-extrabold tracking-tight text-center">Seus Serviços & Eventos</h1>
          <button
            onClick={() => onNavigate('create_activity')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#80d6d1] hover:bg-[#006a66] text-white transition-colors active:scale-95 cursor-pointer"
          >
            <LucideIcon name="Plus" size={18} />
          </button>
        </header>

        <main className="p-4 flex-grow">
          <div className="mb-4">
            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">Seu Portfólio</h1>
            <p className="text-xs text-gray-400">
              {services.length + events.length} item{services.length + events.length !== 1 ? 's' : ''} cadastrado{services.length + events.length !== 1 ? 's' : ''}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-red-700 font-semibold">⚠️ {error}</p>
            </div>
          )}

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-6 py-1">
            {(['Todos', 'Serviços', 'Eventos'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.8 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  selectedFilter === filter 
                    ? 'bg-[#00201f] text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredContent.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 p-6 flex flex-col items-center">
                <LucideIcon name="ShoppingBag" size={36} className="text-gray-300 mb-2" />
                <p className="text-xs font-bold text-gray-500">
                  {selectedFilter === 'Todos' 
                    ? 'Nenhum serviço ou evento cadastrado' 
                    : `Nenhum${selectedFilter === 'Serviços' ? ' serviço' : ' evento'} cadastrado`}
                </p>
                <button 
                  onClick={() => onNavigate('create_activity')}
                  className="mt-3 bg-[#80d6d1] hover:bg-[#006a66] hover:text-white text-gray-950 font-bold px-4 py-2 rounded-full text-[11px] uppercase cursor-pointer"
                >
                  Criar Agora
                </button>
              </div>
            ) : (
              filteredContent.map((item) => {
                const isEvent = 'eventType' in item;
                const imageUrl = item.imageUrl || (isEvent 
                  ? 'https://via.placeholder.com/400x300?text=Evento'
                  : 'https://via.placeholder.com/400x300?text=Servico'
                );
                
                return (
                  <motion.article 
                    layout
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
                      <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          isEvent ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {isEvent ? item.eventType : item.serviceType}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                        <LucideIcon name="Calendar" size={12} className="text-white" />
                        <span className="text-[11px] font-bold text-white">
                          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-extrabold text-sm text-gray-900 flex-1 leading-snug">{item.title}</h3>
                        <span className="text-xs font-bold text-[#006a66] whitespace-nowrap ml-2">{item.valueDescription}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-2">
                        <span className="flex items-center gap-1">
                          <LucideIcon name="MapPin" size={10} />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <LucideIcon name="User" size={10} />
                          {item.entrepreneurName}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            )}
          </div>
        </main>
      </div>

      <footer>
        <div className="pb-4 select-none pointer-events-none">
          <div className="w-32 h-1 bg-black rounded-full mx-auto opacity-15" />
        </div>
      </footer>
    </div>
  );
};


// --- SCREEN 11: UPDATE ENTREPRENEUR PROFILE (CONFIGURAÇÕES DO NEGÓCIO) ---
interface UpdateEntrepreneurProfileProps {
  onBack: () => void;
  currentName: string;
  currentEmail: string;
  currentAvatar?: string;
  onSave: (updatedData: { name: string; email: string; avatarUrl: string }) => void;
}

export const UpdateEntrepreneurProfileScreen: React.FC<UpdateEntrepreneurProfileProps> = ({
  onBack,
  currentName,
  currentEmail,
  currentAvatar,
  onSave,
}) => {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar || ''); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onSave({ name, email, avatarUrl });
      setLoading(false);
      onBack();
    }, 800);
  };

  return (
    <div className="w-full h-full bg-[#F8F4E8] text-gray-800 overflow-y-auto no-scrollbar pb-32 flex flex-col p-6">
      <header className="pt-2 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-1.5 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
        >
          <LucideIcon name="ArrowLeft" size={22} className="text-gray-800" />
        </button>
        <span className="text-[10px] bg-[#006a66]/20 text-[#006a66] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Configurações do Negócio
        </span>
        <div className="w-8" />
      </header>

      <section className="mt-8 flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-200">
          <img 
            src={avatarUrl || "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=150&q=80"} 
            alt="Logo do Empreendimento" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <LucideIcon name="Camera" size={16} className="text-white" />
          </div>
        </div>
        <h2 className="text-sm font-black text-gray-800 mt-3 uppercase tracking-tight">Foto / Logotipo</h2>
      </section>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 flex-grow font-sans">
        <div className="bg-[#CBCBC1]/60 p-4 rounded-2xl shadow-sm">
          <label className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight block mb-1">Nome Comercial / Responsável</label>
          <div className="flex items-center gap-3">
            <LucideIcon name="Briefcase" size={16} className="text-gray-600" />
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-gray-900"
              required
            />
          </div>
        </div>

        <div className="bg-[#CBCBC1]/60 p-4 rounded-2xl shadow-sm">
          <label className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight block mb-1">E-mail Corporativo</label>
          <div className="flex items-center gap-3">
            <LucideIcon name="Mail" size={16} className="text-gray-600" />
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-gray-900"
              required
            />
          </div>
        </div>

        <div className="bg-[#CBCBC1]/60 p-4 rounded-2xl shadow-sm">
          <label className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight block mb-1">Nova Senha</label>
          <div className="flex items-center gap-3">
            <LucideIcon name="Lock" size={16} className="text-gray-600" />
            <input 
              type="password" 
              value={password}
              placeholder="Alterar senha antiga"
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-gray-900"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#006a66] hover:bg-[#00524f] text-white font-extrabold py-4 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer mt-6"
        >
          {loading ? 'Salvando Alterações...' : 'Salvar Dados da Empresa'}
        </button>
      </form>
    </div>
  );
};