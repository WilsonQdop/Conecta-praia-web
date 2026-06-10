import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { UserRole } from '../types';
import { IMAGES } from '../data';

interface WelcomeProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeProps> = ({ onNext }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.2)), url(${IMAGES.welcomeBg})` }}
      />

      {/* Top Status Bar Filler */}
      <div className="relative z-10 px-5 pt-3 pb-2 flex justify-between items-center text-white/90 text-xs font-semibold">
        <span>9:27</span>
        <div className="flex gap-1.5 items-center">
          <LucideIcon name="Wifi" size={13} />
          <LucideIcon name="Battery" size={13} />
        </div>
      </div>

      <div className="flex-grow" />

      {/* Card Content with entrance animation */}
      <motion.section 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="relative z-10 bg-white text-gray-900 rounded-t-[32px] px-8 pt-8 pb-10 flex flex-col items-center text-center shadow-[0_-8px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="w-12 h-1 bg-gray-200 rounded-full mb-6" />

        <div className="mb-8 max-w-[280px]">
          <h1 className="text-[23px] leading-tight font-extrabold text-gray-900 mb-3 tracking-tight">
            Descubra os sabores e histórias da nossa praia.
          </h1>
          <p className="text-sm text-gray-500 font-medium leading-snug">
            Sua conexão com a orla em um só lugar.
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={onNext}
          className="w-full bg-[#80d6d1] hover:bg-[#6ebdb8] active:scale-95 transition-all text-gray-900 font-extrabold py-4 rounded-full text-base uppercase tracking-wide shadow-md cursor-pointer"
        >
          Começar
        </button>

        {/* iOS Indicator spacer */}
        <div className="w-32 h-1 bg-gray-200 rounded-full mt-6 -mb-6" />
      </motion.section>
    </div>
  );
};

interface LoginProps {
  onBack: () => void;
  onRegister: () => void;
  onLogin: (email: string, role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginProps> = ({ onBack, onRegister, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Por favor, insira seu e-mail.');
      return;
    }
    // Simple heuristic to determine user role based on email if the user didn't pre-choose,
    // or we default to Turista, but can let him pre-config in the role Selection
    let resolvedRole = UserRole.Turista;
    if (email.toLowerCase().includes('empreendedor') || email.toLowerCase().includes('barraca')) {
      resolvedRole = UserRole.Empreendedor;
    } else if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('lucio')) {
      resolvedRole = UserRole.Administrador;
    }
    
    onLogin(email, resolvedRole);
  };

  const handleQuickLogin = (role: UserRole) => {
    let mockEmail = 'turista@domain.com';
    if (role === UserRole.Empreendedor) mockEmail = 'barraca@ceuazul.com.br';
    if (role === UserRole.Administrador) mockEmail = 'lucio.botelho@admin.com';
    onLogin(mockEmail, role);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#4DA297] text-white overflow-y-auto no-scrollbar justify-between p-6">
      <header className="flex justify-between items-center pt-4">
        <span className="text-xs font-semibold opacity-80">9:27</span>
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity bg-black/10 px-3 py-1 rounded-full cursor-pointer"
        >
          <LucideIcon name="ArrowLeft" size={14} />
          <span>Voltar</span>
        </button>
      </header>

      <div className="flex-grow flex flex-col justify-center px-2 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight">Bem-vindo ao Coastal Haven</h2>
          <p className="text-xs text-teal-100 mt-1">Conectando você às maravilhas de Porto de Galinhas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
              placeholder="Digite seu e-mail"
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all"
            />
          </div>
          <div>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-200 bg-red-800/30 p-2 rounded text-center font-medium">
              {errorMsg}
            </p>
          )}

          <div className="space-y-3 pt-2">
            <button 
              type="submit"
              className="w-full h-12 bg-[#76C7C0] hover:bg-[#68B1AB] text-white font-semibold rounded-lg transition-colors shadow-md cursor-pointer"
            >
              Entrar
            </button>

            <button 
              type="button"
              onClick={() => handleQuickLogin(UserRole.Turista)}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer"
            >
              <img src={IMAGES.googleLogo} alt="Google Logo" className="w-5 h-5" />
              <span className="text-sm">Entrar com Google</span>
            </button>
          </div>
        </form>

        {/* Shortcut Profile Helpers (Ideal for visual testing of different screens!) */}
        <div className="mt-8 pt-4 border-t border-white/15 text-center">
          <p className="text-[10px] text-teal-100 font-bold uppercase tracking-wider mb-2">Acesso Rápido de Demonstração:</p>
          <div className="flex gap-1.5 justify-center">
            <button 
              onClick={() => handleQuickLogin(UserRole.Turista)}
              className="text-[10px] bg-black/20 hover:bg-black/45 hover:text-white transition-all px-2.5 py-1.5 rounded-full font-bold text-teal-100"
            >
              🚀 Turista
            </button>
            <button 
              onClick={() => handleQuickLogin(UserRole.Empreendedor)}
              className="text-[10px] bg-black/20 hover:bg-black/45 hover:text-white transition-all px-2.5 py-1.5 rounded-full font-bold text-teal-100"
            >
              🏪 Empreendedor
            </button>
            <button 
              onClick={() => handleQuickLogin(UserRole.Administrador)}
              className="text-[10px] bg-black/20 hover:bg-black/45 hover:text-white transition-all px-2.5 py-1.5 rounded-full font-bold text-teal-100"
            >
              🛡️ ADM
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-xs">
          <button 
            onClick={() => alert('Link de recuperação enviado para o seu e-mail!')}
            className="text-white font-medium underline underline-offset-2 opacity-95 hover:opacity-100"
          >
            Esqueceu sua senha?
          </button>
          <button 
            onClick={onRegister}
            className="text-white font-medium underline underline-offset-2 opacity-95 hover:opacity-100"
          >
            Não possui cadastro?
          </button>
        </div>
      </div>

      <div className="w-24 h-1 bg-white/20 rounded-full mx-auto" />
    </div>
  );
};

interface RegisterProps {
  onBack: () => void;
  onRegistered: (email: string) => void;
  onHasAccount: () => void;
}

export const RegisterScreen: React.FC<RegisterProps> = ({ onBack, onRegistered, onHasAccount }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Digite seu e-mail para cadastrar!');
      return;
    }
    onRegistered(email);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-800 p-6 overflow-y-auto no-scrollbar justify-between">
      <header className="flex justify-between items-center pt-4">
        <span className="text-xs font-semibold text-gray-400">9:27</span>
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-gray-950 text-sm font-medium gap-1.5 cursor-pointer"
        >
          <span>Voltar</span>
          <LucideIcon name="ArrowLeft" size={16} />
        </button>
      </header>

      <main className="flex-grow flex flex-col justify-center px-2 py-8">
        <div className="text-center mb-10">
          <h1 className="text-[26px] font-extrabold text-gray-900 mb-2">Crie uma conta</h1>
          <p className="text-gray-400 text-sm">Insira seu e-mail e junte-se a nós.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#80d6d1] hover:bg-[#4f9e9a] text-white font-bold py-3.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Cadastrar-se com o e-mail
          </button>
        </form>

        <div className="relative flex py-4 items-center mb-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">ou continue com</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button 
          onClick={() => onRegistered('gmail-user@google.com')}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 py-3.5 rounded-lg transition-all shadow-sm cursor-pointer"
        >
          <img src={IMAGES.googleLogo} alt="Google" className="w-5 h-5" />
          <span className="text-sm font-semibold text-gray-700">Google</span>
        </button>
      </main>

      <footer className="text-center space-y-4 pt-4">
        <p className="text-[10px] leading-relaxed text-gray-400 px-4">
          Ao continuar, você aceita nossa <span className="underline cursor-pointer text-gray-500">Política de Privacidade</span> e <span className="underline cursor-pointer text-gray-500">Termos de uso</span>.
        </p>
        <button 
          onClick={onHasAccount}
          className="text-sm font-bold text-gray-800 hover:opacity-80 transition-opacity underline block mx-auto cursor-pointer"
        >
          Já possuo cadastro
        </button>
      </footer>
    </div>
  );
};

interface RoleSelectProps {
  onBack: () => void;
  onSelect: (role: UserRole) => void;
}

export const RoleSelectScreen: React.FC<RoleSelectProps> = ({ onBack, onSelect }) => {
  return (
    <div className="w-full h-full flex flex-col bg-[#4ea19b] text-white overflow-y-auto no-scrollbar justify-between p-6">
      <header className="flex justify-between items-center pt-4">
        <span className="text-xs font-semibold">9:27</span>
        <button 
          onClick={onBack}
          className="flex items-center text-xs bg-black/10 hover:bg-black/20 px-3 py-1 rounded-full cursor-pointer transition-colors"
        >
          <LucideIcon name="ArrowLeft" size={12} className="mr-1" />
          <span>Voltar</span>
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center py-8">
        <div className="bg-white rounded-[32px] w-full p-10 shadow-xl flex flex-col items-center text-center">
          <h1 className="text-[28px] font-black text-[#80d6d1] mb-10 tracking-tight">
            VOCÊ É?
          </h1>

          <div className="grid grid-cols-3 gap-2 w-full">
            <button 
              onClick={() => onSelect(UserRole.Turista)}
              className="bg-[#80d6d1] hover:bg-[#68bbae] active:scale-95 text-white font-bold py-4 px-1 rounded-lg text-xs leading-none transition-all shadow-sm cursor-pointer"
            >
              Turista
            </button>
            <button 
              onClick={() => onSelect(UserRole.Empreendedor)}
              className="bg-[#80d6d1] hover:bg-[#68bbae] active:scale-95 text-white font-bold py-4 px-1 rounded-lg text-xs leading-none transition-all shadow-sm cursor-pointer"
            >
              Empreendedor
            </button>
            <button 
              onClick={() => onSelect(UserRole.Administrador)}
              className="bg-[#80d6d1] hover:bg-[#68bbae] active:scale-95 text-white font-bold py-4 px-1 rounded-lg text-xs leading-none transition-all shadow-sm cursor-pointer"
            >
              Administrador
            </button>
          </div>
        </div>
      </main>

      <footer className="flex justify-center pb-2">
        <div className="w-32 h-1.5 bg-black/20 rounded-full" />
      </footer>
    </div>
  );
};
