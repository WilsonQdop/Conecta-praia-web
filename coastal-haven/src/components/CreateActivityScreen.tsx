import React, { useState } from 'react';
import { LucideIcon } from './LucideIcon';
import { LocalActivity } from '../types';

interface CreateActivityProps {
  onBack: () => void;
  onSave: (activity: Omit<LocalActivity, 'id' | 'rating' | 'reviewsCount'>) => void;
}

export const CreateActivityScreen: React.FC<CreateActivityProps> = ({ onBack, onSave }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'evento' | 'servico'>('servico');
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<LocalActivity['category']>('Geral');
  const [details, setDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preset suggestion images based on categories
  const getPresetImage = (cat: string) => {
    switch (cat) {
      case 'Restaurantes':
        return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=300';
      case 'Bares':
        return 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=300';
      case 'Surf':
        return 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=300';
      case 'Caminhada':
        return 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=300';
      case 'Autônomos':
        return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300';
      default:
        return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const nextErrors: Record<string, string> = {};
    if (!title.trim()) nextErrors.title = 'Título é obrigatório';
    if (!organizer.trim()) nextErrors.organizer = 'Organizador é obrigatório';
    if (!date.trim()) nextErrors.date = 'Data/Horário é obrigatório';
    if (!location.trim()) nextErrors.location = 'Local é obrigatório';
    if (!price.trim()) nextErrors.price = 'Valor/Preço é obrigatório';
    if (!details.trim()) nextErrors.details = 'Descrição é obrigatória';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const finalImage = imageUrl.trim() || getPresetImage(category);

    onSave({
      title,
      type,
      organizer,
      date,
      location,
      price,
      category,
      details,
      image: finalImage,
      icon: type === 'evento' ? 'Calendar' : 'Store',
    });

    alert(`Sucesso! Seu ${type === 'evento' ? 'evento' : 'serviço'} foi publicado na orla.`);
  };

  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-900 overflow-y-auto no-scrollbar flex flex-col justify-between">
      <div>
        {/* Header toolbar */}
        <header className="sticky top-0 z-20 bg-white px-4 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
          <button 
            type="button"
            onClick={onBack}
            className="p-1 px-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          >
            <LucideIcon name="ArrowLeft" size={12} />
            <span>Voltar</span>
          </button>
          
          <h1 className="text-xs font-black text-gray-500 uppercase tracking-wider">
            Novo Cadastro
          </h1>
          <div className="w-16" />
        </header>

        {/* Content banner and form */}
        <main className="p-5">
          <div className="mb-6">
            <h2 className="text-xl font-black text-gray-950 tracking-tight leading-none mb-1">
              Criar Evento ou Serviço
            </h2>
            <p className="text-xs text-gray-400">Preencha o formulário para publicar instantaneamente na praia.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                Nome / Título do Serviço ou Evento:
              </label>
              <input 
                type="text"
                placeholder="Ex: Passeio de Buggy pelas Piscinas"
                value={title}
                onChange={(e) => { setTitle(e.target.value); if(errors.title) delete errors.title; }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 placeholder:text-gray-400"
              />
              {errors.title && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.title}</p>}
            </div>

            {/* Type Switch / Toggle */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1.5">
                Tipo do Cadastro:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setType('servico')}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${type === 'servico' ? 'bg-[#80d6d1] text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Serviço / Oferta
                </button>
                <button
                  type="button"
                  onClick={() => setType('evento')}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${type === 'evento' ? 'bg-[#80d6d1] text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Evento / Atividade
                </button>
              </div>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                Categoria:
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] text-gray-800"
              >
                <option value="Geral">Geral</option>
                <option value="Restaurantes">Restaurantes</option>
                <option value="Bares">Bares</option>
                <option value="Autônomos">Autônomos / Vendedores</option>
                <option value="Surf">Surf / Esportes Marítimos</option>
                <option value="Caminhada">Caminhada / Trilhas</option>
                <option value="Ciclismo">Ciclismo</option>
                <option value="Corrida">Corrida</option>
              </select>
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                Organizador / Empresa:
              </label>
              <input 
                type="text"
                placeholder="Ex: Barraca Céu Azul ou Associação de Guias"
                value={organizer}
                onChange={(e) => { setOrganizer(e.target.value); if(errors.organizer) delete errors.organizer; }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900"
              />
              {errors.organizer && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.organizer}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Date */}
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                  Data / Frequência:
                </label>
                <input 
                  type="text"
                  placeholder="Ex: Diariamente / 10/08"
                  value={date}
                  onChange={(e) => { setDate(e.target.value); if(errors.date) delete errors.date; }}
                  className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900"
                />
                {errors.date && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.date}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                  Preço / Desconto:
                </label>
                <input 
                  type="text"
                  placeholder="Ex: R$ 50,00 ou Grátis"
                  value={price}
                  onChange={(e) => { setPrice(e.target.value); if(errors.price) delete errors.price; }}
                  className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900"
                />
                {errors.price && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.price}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                Ponto de Encontro / Localização:
              </label>
              <input 
                type="text"
                placeholder="Ex: Orla de Porto de Galinhas, ao lado do letreiro"
                value={location}
                onChange={(e) => { setLocation(e.target.value); if(errors.location) delete errors.location; }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900"
              />
              {errors.location && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.location}</p>}
            </div>

            {/* Image URL Optional */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                URL da Imagem (Opcional):
              </label>
              <input 
                type="text"
                placeholder="Ex: https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 placeholder:text-gray-400 text-ellipsis overflow-hidden"
              />
              <span className="text-[9px] text-gray-400 font-medium block mt-1">Se deixado em branco, uma imagem profissional padrão da categoria será selecionada.</span>
            </div>

            {/* Description Details */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                Detalhes do Serviço ou Evento:
              </label>
              <textarea 
                rows={4}
                placeholder="Descreva sobre o passeio, dicas, curiosidades..."
                value={details}
                onChange={(e) => { setDetails(e.target.value); if(errors.details) delete errors.details; }}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 resize-none"
              />
              {errors.details && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.details}</p>}
            </div>

            {/* Publish Button */}
            <button
              type="submit"
              className="w-full bg-[#006a66] hover:brightness-110 active:scale-98 text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Publicar Agora
            </button>
          </form>
        </main>
      </div>

      <footer className="pb-4 pt-4 text-center select-none">
        <div className="w-32 h-1 bg-gray-400 rounded-full mx-auto opacity-20" />
      </footer>
    </div>
  );
};
