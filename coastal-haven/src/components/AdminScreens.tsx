import React from 'react';
import { LucideIcon } from './LucideIcon';
import { IMAGES } from '../data';
import { motion } from 'motion/react';
import { adminService, PostServiceResponseDTO, PostEventResponseDTO } from '../services/api';

interface AdminProfileProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  adminName?: string; // Nome do admin logado
}

export const AdminProfileScreen: React.FC<AdminProfileProps> = ({ 
  onBack, 
  onLogout, 
  onNavigate,
  adminName = 'Administrador'
}) => {
  return (
    <div className="w-full h-full bg-[#F7F3E9] text-gray-800 overflow-y-auto no-scrollbar pb-32 flex flex-col justify-between p-6">
      
      {/* Top Header navbar */}
      <div>
        <header className="pt-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-1 px-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors flex items-center gap-1 text-xs font-bold text-gray-800 cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={12} />
            <span>Voltar</span>
          </button>
          
          <div className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
            Olá, {adminName.split(' ')[0]}! (ADM)
          </div>
          <div className="w-8" />
        </header>

        {/* User Identity Profile Summary */}
        <section className="mt-10 flex items-center gap-6">
          {/* Avatar placeholder with ADM shield icon override */}
          <div className="w-24 h-24 bg-[#D9D7CE] rounded-full flex items-center justify-center relative shadow-inner">
            <LucideIcon name="User" size={48} className="text-gray-500" />
            <span className="absolute bottom-1 right-1 bg-yellow-400 text-gray-950 p-1 rounded-full border-2 border-[#F7F3E9] shadow-sm">
              <LucideIcon name="ShieldAlert" size={13} fill="currentColor" />
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-gray-800 leading-tight">
              {adminName}
            </h1>
            <p className="text-xs font-bold text-[#006a66] flex items-center gap-0.5">
              <span>ADMINISTRADOR GERAL</span>
            </p>
          </div>
        </section>

        {/* Action / Auditing Links List */}
        <nav className="mt-12 space-y-3.5">
          {/* NOVO: Visualizar todas as atividades */}
          <button 
            onClick={() => onNavigate('admin_all_activities')}
            className="w-full text-left px-4 py-4 bg-[#80d6d1] hover:brightness-105 rounded-2xl text-gray-950 font-black text-xs uppercase tracking-wide transition-all shadow-md flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LucideIcon name="BarChart3" size={16} />
              <span>Monitorar Todas as Atividades</span>
            </span>
            <LucideIcon name="ChevronRight" size={14} />
          </button>

          <button 
            onClick={() => alert(`Visualizando credenciais de Administrador:\nNome: ${adminName}\nNível: Nível 3 (Root)\nPermissões: Total`)}
            className="w-full text-left px-4 py-4 bg-[#D9D7CE] hover:opacity-90 rounded-2xl text-gray-800 font-extrabold text-xs uppercase tracking-wide transition-all shadow-xs flex items-center justify-between cursor-pointer"
          >
            <span>Informações pessoais</span>
            <LucideIcon name="ChevronRight" size={14} />
          </button>

          <button 
            onClick={() => onBack()}
            className="w-full text-left px-4 py-4 bg-[#D9D7CE] hover:opacity-90 rounded-2xl text-gray-800 font-extrabold text-xs uppercase tracking-wide transition-all shadow-xs flex items-center justify-between cursor-pointer"
          >
            <span>Trocar conta</span>
            <LucideIcon name="ChevronRight" size={14} />
          </button>

          <button 
            onClick={() => {
              const bug = prompt('Por favor, descreva o bug observado no sistema de monitoramento:');
              if (bug) {
                console.log('[BUG_REPORT] ' + bug);
                alert('Obrigado! Seu relato foi registrado no sistema de auditoria.');
              }
            }}
            className="w-full text-left px-4 py-4 bg-[#D9D7CE] hover:opacity-90 rounded-2xl text-gray-800 font-extrabold text-xs uppercase tracking-wide transition-all shadow-xs flex items-center justify-between cursor-pointer"
          >
            <span>Relatar bug</span>
            <LucideIcon name="ChevronRight" size={14} />
          </button>
        </nav>
      </div>

      {/* Logout call action buttons */}
      <footer className="flex flex-col items-center pt-8">
        <button 
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-extrabold py-3.5 px-12 rounded-full shadow-lg shadow-red-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
        >
          Sair do Sistema
        </button>

        <div/>
      </footer>
      
    </div>
  );
};

// AdminAllActivitiesScreen.tsx - Tela para admin visualizar TODAS as atividades



interface AdminAllActivitiesProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export const AdminAllActivitiesScreen: React.FC<AdminAllActivitiesProps> = ({
  onBack,
  onNavigate,
}) => {
  const [services, setServices] = React.useState<PostServiceResponseDTO[]>([]);
  const [events, setEvents] = React.useState<PostEventResponseDTO[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<'Todos' | 'Serviços' | 'Eventos'>('Todos');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  // ════════════════════════════════════════════════════════════════
  // 📥 CARREGAR TODAS AS ATIVIDADES (Admin)
  // ════════════════════════════════════════════════════════════════
  React.useEffect(() => {
    const loadAllActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('[ADMIN_ACTIVITIES] Carregando todas as atividades...');
        
        // 🔵 Buscar TODOS os serviços
        const allServices = await adminService.getAllServices();
        console.log('[ADMIN_ACTIVITIES] ✅ Serviços carregados:', allServices.length);
        setServices(allServices);

        // 🟡 Buscar TODOS os eventos
        const allEvents = await adminService.getAllEvents();
        console.log('[ADMIN_ACTIVITIES] ✅ Eventos carregados:', allEvents.length);
        setEvents(allEvents);

        setLoading(false);
      } catch (error: any) {
        console.error('[ADMIN_ACTIVITIES] ❌ Erro ao carregar atividades:', error);
        
        const errorMessage = error.response?.data?.message 
          || error.message 
          || 'Erro ao carregar atividades do sistema';
        
        setError(errorMessage);
        setLoading(false);
        setServices([]);
        setEvents([]);
      }
    };

    loadAllActivities();
  }, []);

  // ════════════════════════════════════════════════════════════════
  // 🔄 FILTRAR E BUSCAR CONTEÚDO
  // ════════════════════════════════════════════════════════════════
  const filteredContent = React.useMemo(() => {
    let content: any[] = [];

    if (selectedFilter === 'Serviços' || selectedFilter === 'Todos') {
      content.push(...services.map(s => ({ ...s, type: 'service' })));
    }
    
    if (selectedFilter === 'Eventos' || selectedFilter === 'Todos') {
      content.push(...events.map(e => ({ ...e, type: 'event' })));
    }

    // Filtrar por busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      content = content.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term) ||
        item.entrepreneurName.toLowerCase().includes(term)
      );
    }

    return content;
  }, [selectedFilter, services, events, searchTerm]);

  // ════════════════════════════════════════════════════════════════
  // 🎨 RENDERING
  // ════════════════════════════════════════════════════════════════

  if (loading) {
    return (
      <div className="w-full h-full bg-[#fbf9f8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006a66] mx-auto mb-3"></div>
          <p className="text-xs text-gray-500">Carregando todas as atividades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-900 overflow-y-auto no-scrollbar pb-32 flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#fbf9f8] flex justify-between items-center w-full px-4 py-4 border-b border-gray-100">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95 cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={20} />
          </button>
          
          <h1 className="text-base font-extrabold tracking-tight text-center">Monitoramento</h1>

          <div className="w-10" />
        </header>

        {/* Título e descrição */}
        <main className="p-4 flex-grow">
          <div className="mb-4">
            <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none mb-1">
              Todas as Atividades
            </h1>
            <p className="text-xs text-gray-400">
              🛡️ Admin - {services.length + events.length} atividades no sistema
            </p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-red-700 font-semibold">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Barra de busca */}
          <div className="mb-4">
            <div className="relative">
              <LucideIcon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Buscar por título, local ou empreendedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-xs font-medium outline-none focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <LucideIcon name="X" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filtros */}
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

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Serviços</p>
              <p className="text-xl font-black text-[#006a66]">{services.length}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Eventos</p>
              <p className="text-xl font-black text-purple-600">{events.length}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Total</p>
              <p className="text-xl font-black text-blue-600">{services.length + events.length}</p>
            </div>
          </div>

          {/* Lista de Atividades */}
          <div className="space-y-4">
            {filteredContent.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 p-6 flex flex-col items-center">
                <LucideIcon 
                  name={searchTerm ? "Search" : "Activity"} 
                  size={36} 
                  className="text-gray-300 mb-2" 
                />
                <p className="text-xs font-bold text-gray-500">
                  {searchTerm 
                    ? `Nenhuma atividade encontrada para "${searchTerm}"`
                    : 'Nenhuma atividade cadastrada'
                  }
                </p>
              </div>
            ) : (
              filteredContent.map((item) => {
                // Determinar se é evento ou serviço
                const isEvent = item.type === 'event';
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
                    {/* Imagem */}
                    <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Imagem';
                        }}
                      />
                      
                      {/* Badge tipo e admin shield */}
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                          isEvent 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {isEvent ? item.eventType : item.serviceType}
                        </span>
                        <span className="bg-yellow-400 text-gray-950 px-1.5 py-1 rounded-full flex items-center gap-0.5" title="Admin monitorando">
                          <LucideIcon name="Shield" size={10} />
                        </span>
                      </div>

                      {/* Status verificado */}
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                        <LucideIcon name="Calendar" size={12} className="text-white" />
                        <span className="text-[11px] font-bold text-white">
                          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-extrabold text-sm text-gray-900 leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
                            por {item.entrepreneurName}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#006a66] whitespace-nowrap ml-2">
                          {item.valueDescription}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-600 line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-gray-500 border-t border-gray-100 pt-2">
                        <span className="flex items-center gap-1">
                          <LucideIcon name="MapPin" size={10} />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                          ID: {item.id.substring(0, 8)}...
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

      {/* iOS indicator */}
      <footer>
        <div className="pb-4 select-none pointer-events-none">
          <div className="w-32 h-1 bg-black rounded-full mx-auto opacity-15" />
        </div>
      </footer>
    </div>
  );
};