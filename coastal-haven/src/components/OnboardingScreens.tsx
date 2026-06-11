import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { UserRole } from '../types';
import { IMAGES } from '../data';
import { authService, RegisterRequest } from '../services/api';

interface WelcomeProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeProps> = ({ onNext }) => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end overflow-hidden bg-black text-white">
      
      {/* Background Image - Agora cobrindo 100% do container absoluto por trás */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${IMAGES.welcomeBg})` }}
      />

      {/* Card Content - Ajustado para ocupar 1/3 da tela (h-1/3) ou se ajustar perfeitamente ao fim */}
      <motion.section 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="relative z-10 w-full min-h-[35vh] bg-white text-gray-900 rounded-t-[32px] px-8 pt-6 pb-8 flex flex-col items-center justify-between text-center shadow-[0_-8px_30px_rgba(0,0,0,0.3)]"
      >
        {/* Handle superior do card simulando bottom sheet do iOS */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mb-4 flex-shrink-0" />

        <div className="mb-6 max-w-[280px]">
          <h1 className="text-[22px] leading-tight font-extrabold text-gray-900 mb-2 tracking-tight">
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
        <div className="w-32 h-1 bg-gray-200 rounded-full mt-4 flex-shrink-0" />
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
  const [loading, setLoading] = useState(false);

  // Mapear role do backend para o frontend
  const mapRole = (backendRole: string): UserRole => {
    switch (backendRole) {
      case 'EMPREENDEDOR':
        return UserRole.Empreendedor;
      case 'ADMIN':
        return UserRole.Administrador;
      default:
        return UserRole.Turista;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!email) {
      setErrorMsg('Por favor, insira seu e-mail.');
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorMsg('Por favor, insira sua senha.');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.login({ email, password });
      const mappedRole = mapRole(response.role);
      
      // Armazenar dados no localStorage para persistência
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('userName', response.name);
      
      onLogin(email, mappedRole);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      setErrorMsg(errorMessage);
      console.error('Erro de login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    // Para teste rápido - usar credenciais de exemplo
    setLoading(true);
    try {
      let mockEmail = 'turista@example.com';
      let mockPassword = 'password123';

      if (role === UserRole.Empreendedor) {
        mockEmail = 'empreendedor@example.com';
      } else if (role === UserRole.Administrador) {
        mockEmail = 'admin@example.com';
      }

      const response = await authService.login({ 
        email: mockEmail, 
        password: mockPassword 
      });

      localStorage.setItem('userEmail', mockEmail);
      localStorage.setItem('userRole', response.role);
      localStorage.setItem('userName', response.name);

      onLogin(mockEmail, role);
    } catch (error: any) {
      // Se falhar, mostrar mensagem
      const errorMessage = error.response?.data?.message || 'Credenciais de teste não encontradas.';
      alert(`Erro: ${errorMessage}\n\nUse o formulário acima com suas credenciais reais.`);
      console.error('Erro no login rápido:', error);
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              disabled={loading}
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all disabled:opacity-50"
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
              disabled={loading}
              className="w-full h-12 bg-[#76C7C0] hover:bg-[#68B1AB] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md cursor-pointer"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <button 
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin(UserRole.Turista)}
              className="w-full h-12 bg-white hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer"
            >
              <img src={IMAGES.googleLogo} alt="Google Logo" className="w-5 h-5" />
              <span className="text-sm">Entrar com Google</span>
            </button>
          </div>
        </form>

        {/* Shortcut Profile Helpers (Demo) */}
        <div className="mt-8 pt-4 border-t border-white/15 text-center">
          <p className="text-[10px] text-teal-100 font-bold uppercase tracking-wider mb-2">Acesso Rápido de Demonstração:</p>
          <div className="flex gap-1.5 justify-center flex-wrap">
            <button 
              onClick={() => handleQuickLogin(UserRole.Turista)}
              disabled={loading}
              className="text-[10px] bg-black/20 hover:bg-black/45 disabled:opacity-50 hover:text-white transition-all px-2.5 py-1.5 rounded-full font-bold text-teal-100 cursor-pointer"
            >
              🚀 Turista
            </button>
            <button 
              onClick={() => handleQuickLogin(UserRole.Empreendedor)}
              disabled={loading}
              className="text-[10px] bg-black/20 hover:bg-black/45 disabled:opacity-50 hover:text-white transition-all px-2.5 py-1.5 rounded-full font-bold text-teal-100 cursor-pointer"
            >
              🏪 Empreendedor
            </button>
            <button 
              onClick={() => handleQuickLogin(UserRole.Administrador)}
              disabled={loading}
              className="text-[10px] bg-black/20 hover:bg-black/45 disabled:opacity-50 hover:text-white transition-all px-2.5 py-1.5 rounded-full font-bold text-teal-100 cursor-pointer"
            >
              🛡️ ADM
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-xs">
          <button 
            onClick={() => alert('Link de recuperação enviado para o seu e-mail!')}
            className="text-white font-medium underline underline-offset-2 opacity-95 hover:opacity-100 cursor-pointer"
          >
            Esqueceu sua senha?
          </button>
          <button 
            onClick={onRegister}
            className="text-white font-medium underline underline-offset-2 opacity-95 hover:opacity-100 cursor-pointer"
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    role: 'TURISTA' as 'TURISTA' | 'EMPREENDEDOR' | 'ADMIN',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Validação de CPF simples (apenas formato)
  const validateCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.length === 11;
  };

  // Validação de telefone
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validações
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido (10 ou 11 dígitos)';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Senhas não correspondem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 🧹 LIMPAR localStorage ANTES de registrar
    console.log('[DEBUG] Limpando localStorage...');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    console.log('[DEBUG] localStorage limpo!');

    // Chamar API
    setLoading(true);
    try {
      const registerRequest: RegisterRequest = {
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ''), // Remove formatting
        phone: formData.phone.replace(/\D/g, ''),
        password: formData.password,
        role: formData.role as 'TURISTA' | 'EMPREENDEDOR' | 'ADMIN',
      };

      console.log('[DEBUG] Enviando registro para:', registerRequest.email);
      const response = await authService.register(registerRequest);
      console.log('[DEBUG] Registro bem-sucedido!');
      
      alert(`Parabéns! Cadastro de ${formData.role.toLowerCase()} efetuado com sucesso.`);
      onRegistered(response.email);
    } catch (error: any) {
      console.error('[ERROR] Erro completo:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao registrar';
      alert(`Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const formatCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      if (cleaned.length <= 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    return phone;
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
          <h1 className="text-[26px] font-extrabold text-gray-900 mb-2">Crie sua conta</h1>
          <p className="text-gray-400 text-sm">Preencha seus dados para se registrar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          {/* Nome */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nome completo</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="João Silva"
              disabled={loading}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.name && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.name}</p>}
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">E-mail</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@domain.com"
              disabled={loading}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.email}</p>}
          </div>

          {/* CPF */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">CPF</label>
            <input 
              type="text"
              name="cpf"
              value={formatCPF(formData.cpf)}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, '').slice(0, 11);
                setFormData(prev => ({
                  ...prev,
                  cpf: cleaned
                }));
                if (errors.cpf) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.cpf;
                    return newErrors;
                  });
                }
              }}
              placeholder="000.000.000-00"
              disabled={loading}
              maxLength={14}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.cpf && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.cpf}</p>}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Telefone</label>
            <input 
              type="tel"
              name="phone"
              value={formatPhone(formData.phone)}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, '').slice(0, 11);
                setFormData(prev => ({
                  ...prev,
                  phone: cleaned
                }));
                if (errors.phone) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.phone;
                    return newErrors;
                  });
                }
              }}
              placeholder="(81) 9 9999-9999"
              disabled={loading}
              maxLength={15}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.phone && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.phone}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tipo de conta</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="TURISTA">🚀 Turista - Explorar experiências</option>
              <option value="EMPREENDEDOR">🏪 Empreendedor - Oferecer serviços</option>
              <option value="ADMIN">🛡️ Administrador - Gerenciar plataforma</option>
            </select>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Senha</label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mínimo 6 caracteres"
              disabled={loading}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.password && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.password}</p>}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirmar senha</label>
            <input 
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              placeholder="Repita sua senha"
              disabled={loading}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#80d6d1] focus:border-transparent outline-none text-sm font-medium transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.passwordConfirm && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.passwordConfirm}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#80d6d1] hover:bg-[#4f9e9a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            {loading ? 'Registrando...' : 'Cadastrar-se'}
          </button>
        </form>

        <div className="relative flex py-4 items-center mb-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">ou continue com</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button 
          onClick={() => {
            alert('Google Sign-up em desenvolvimento');
          }}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed py-3.5 rounded-lg transition-all shadow-sm cursor-pointer"
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
          disabled={loading}
          className="text-sm font-bold text-gray-800 hover:opacity-80 disabled:opacity-50 transition-opacity underline block mx-auto cursor-pointer"
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
