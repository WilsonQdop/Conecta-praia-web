import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { Review, UserRole } from '../types';
import { IMAGES } from '../data';

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
    <div className="w-full h-full bg-[#F8F4E8] text-gray-800 overflow-y-auto no-scrollbar pb-32 flex flex-col justify-between">
      <div>
        {/* Status Area */}
        <header className="flex justify-between items-center px-6 pt-4 pb-2 text-xs font-semibold">
          <span>9:27</span>
          <div className="flex items-center gap-1.5">
            <LucideIcon name="Wifi" size={13} />
            <LucideIcon name="Battery" size={13} />
          </div>
        </header>

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
        <section className="px-6 py-6 font-sans">
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
                onClick={() => alert('Parabéns, você tem o serviço Peixada do Nê carregado e ativo na orla!')}
                className="w-full bg-[#A9A9A0] hover:bg-gray-400/30 text-gray-900 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider"
              >
                Detalhes
              </button>
            </article>

            {/* Card: Denuncias */}
            <article className="bg-[#CBCBC1] p-4 rounded-2xl flex flex-col items-center justify-between min-h-[140px] shadow-sm text-center">
              <h2 className="text-[10px] font-extrabold text-gray-700 uppercase tracking-tight">Denúncias</h2>
              <span className="text-4xl font-black text-gray-900 py-1">0</span>
              <button 
                onClick={() => alert('Seu perfil está limpo e saudável! Zero denúncias locais.')}
                className="w-full bg-[#A9A9A0] hover:bg-gray-400/30 text-gray-900 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider"
              >
                Detalhes
              </button>
            </article>

          </div>
        </section>

        {/* Promo creation button */}
        <section className="px-6 pb-2">
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
      <footer className="px-6 pb-10 flex flex-col items-center">
        <button 
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-extrabold py-3.5 px-10 rounded-full shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
        >
          Sair do Perfil
        </button>

        <div className="mt-8 w-32 h-1 bg-gray-400 rounded-full opacity-30" />
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
