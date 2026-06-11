import React from 'react';
import { LucideIcon } from './LucideIcon';
import { IMAGES } from '../data';

interface AdminProfileProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export const AdminProfileScreen: React.FC<AdminProfileProps> = ({ onBack, onLogout, onNavigate }) => {
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
            Olá, Lucio! (ADM)
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
            <h1 className="text-2xl font-black text-gray-800 leading-tight">Lucio Botelho</h1>
            <p className="text-xs font-bold text-[#006a66] flex items-center gap-0.5">
              <span>ADMINISTRADOR GERAL</span>
            </p>
          </div>
        </section>

        {/* Action / Auditing Links List */}
        <nav className="mt-12 space-y-3.5">
          <button 
            onClick={() => onNavigate('create_activity')}
            className="w-full text-left px-4 py-4 bg-[#80d6d1] hover:brightness-105 rounded-2xl text-gray-950 font-black text-xs uppercase tracking-wide transition-all shadow-md flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LucideIcon name="PlusCircle" size={16} />
              <span>Cadastrar Evento / Serviço</span>
            </span>
            <LucideIcon name="ChevronRight" size={14} />
          </button>

          <button 
            onClick={() => alert(`Visualizando credenciais de Administrador:\nNome: Lucio Botelho\nE-mail: lucio@coastalhaven.pe.gov.br\nNível: Nível 3 (Root)`)}
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
              if (bug) alert('Obrigado! Seu relato foi registrado na central de auditoria da prefeitura de Porto de Galinhas.');
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
