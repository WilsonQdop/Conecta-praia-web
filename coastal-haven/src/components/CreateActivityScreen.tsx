import React, { useState } from 'react';
import { LucideIcon } from './LucideIcon';
import { LocalActivity } from '../types';

interface CreateActivityProps {
  onBack: () => void;
  onSave: (activity: Omit<LocalActivity, 'id' | 'rating' | 'reviewsCount'>, imageFile?: File) => void;
  organizerName: string; // Nome do usuário logado
}

export const CreateActivityScreen: React.FC<CreateActivityProps> = ({ 
  onBack, 
  onSave,
  organizerName
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'evento' | 'servico'>('servico');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<LocalActivity['category']>('Geral');
  const [details, setDetails] = useState('');
  
  // Para upload de arquivo
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  // Categorias dinâmicas baseadas no tipo
  const getCategories = (): LocalActivity['category'][] => {
    if (type === 'servico') {
      return ['Geral', 'RESTAURANTE', 'Bares', 'Autônomos'];
    } else {
      return ['Geral', 'Surf', 'Caminhada', 'Ciclismo', 'Corrida'];
    }
  };

  // Ao mudar tipo, resetar categoria
  const handleTypeChange = (newType: 'evento' | 'servico') => {
    setType(newType);
    setCategory('Geral');
  };

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
      case 'Ciclismo':
        return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=300';
      case 'Corrida':
        return 'https://images.unsplash.com/photo-1552674605-5defe6aa44bb?auto=format&fit=crop&q=80&w=300';
      case 'Autônomos':
        return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300';
      default:
        return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300';
    }
  };

  // Handle file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remover arquivo selecionado
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const nextErrors: Record<string, string> = {};
    if (!title.trim()) nextErrors.title = 'Título é obrigatório';
    if (!date.trim()) nextErrors.date = 'Data/Horário é obrigatório';
    if (!location.trim()) nextErrors.location = 'Local é obrigatório';
    if (!price.trim()) nextErrors.price = 'Valor/Preço é obrigatório';
    if (!details.trim()) nextErrors.details = 'Descrição é obrigatória';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsUploading(true);

    // Se não tiver arquivo, usar preset
    const finalImage = imagePreview || getPresetImage(category);

    onSave(
      {
        title,
        type,
        organizer: organizerName, // Usuário logado (inalterável)
        date,
        location,
        price,
        category,
        details,
        image: finalImage,
        icon: type === 'evento' ? 'Calendar' : 'Store',
      },
      imageFile || undefined // Passar arquivo se selecionou
    );

    // Reset após envio
    setTimeout(() => {
      setIsUploading(false);
      alert(`Sucesso! Seu ${type === 'evento' ? 'evento' : 'serviço'} foi publicado na orla.`);
    }, 1000);
  };

  const categories = getCategories();

  return (
    <div className="w-full h-full bg-[#fbf9f8] text-gray-900 overflow-y-auto no-scrollbar flex flex-col justify-between">
      <div>
        {/* Header toolbar */}
        <header className="sticky top-0 z-20 bg-white px-4 pt-4 pb-3 border-b border-gray-100 flex items-center justify-between">
          <button 
            type="button"
            onClick={onBack}
            disabled={isUploading}
            className="p-1 px-3.5 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
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
                onChange={(e) => { setTitle(e.target.value); if(errors.title) setErrors(prev => { delete prev.title; return {...prev}; }); }}
                disabled={isUploading}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
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
                  onClick={() => handleTypeChange('servico')}
                  disabled={isUploading}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50 ${type === 'servico' ? 'bg-[#80d6d1] text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Serviço / Oferta
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('evento')}
                  disabled={isUploading}
                  className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50 ${type === 'evento' ? 'bg-[#80d6d1] text-gray-950 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Evento / Atividade
                </button>
              </div>
            </div>

            {/* Category selection - DINÂMICA */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                Categoria ({type === 'servico' ? 'Serviços' : 'Eventos'}):
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                disabled={isUploading}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] text-gray-800 disabled:opacity-50"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Organizer - PRÉ-PREENCHIDO E INALTERÁVEL */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                Seu Nome / Empresa:
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 flex items-center justify-between">
                <span>{organizerName}</span>
                <LucideIcon name="Lock" size={14} className="text-gray-400" />
              </div>
              <p className="text-[9px] text-gray-400 mt-0.5">Automaticamente preenchido com seu nome</p>
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
                  onChange={(e) => { setDate(e.target.value); if(errors.date) setErrors(prev => { delete prev.date; return {...prev}; }); }}
                  disabled={isUploading}
                  className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 disabled:opacity-50"
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
                  onChange={(e) => { setPrice(e.target.value); if(errors.price) setErrors(prev => { delete prev.price; return {...prev}; }); }}
                  disabled={isUploading}
                  className="w-full px-3.5 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 disabled:opacity-50"
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
                onChange={(e) => { setLocation(e.target.value); if(errors.location) setErrors(prev => { delete prev.location; return {...prev}; }); }}
                disabled={isUploading}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 disabled:opacity-50"
              />
              {errors.location && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.location}</p>}
            </div>

            {/* Image Upload - NOVO */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1.5">
                Imagem (Opcional):
              </label>
              
              {imagePreview ? (
                // Preview da imagem selecionada
                <div className="relative w-full">
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-[#80d6d1]">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={isUploading}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white p-1.5 rounded-full shadow-md transition-colors cursor-pointer"
                  >
                    <LucideIcon name="X" size={14} />
                  </button>
                  <p className="text-[9px] text-gray-400 mt-1.5">
                    {imageFile?.name}
                  </p>
                </div>
              ) : (
                // Input para selecionar arquivo
                <label className="block w-full">
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <div className="w-full px-4 py-6 bg-white border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-[#80d6d1] hover:bg-[#80d6d1]/5 transition-all disabled:opacity-50">
                    <LucideIcon name="Image" size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-xs font-semibold text-gray-700">Clique para selecionar uma imagem</p>
                    <p className="text-[9px] text-gray-400 mt-1">ou arraste aqui</p>
                  </div>
                </label>
              )}
              
              <p className="text-[9px] text-gray-400 font-medium mt-1.5">
                Se não selecionar imagem, uma imagem padrão da categoria será usada automaticamente.
              </p>
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
                onChange={(e) => { setDetails(e.target.value); if(errors.details) setErrors(prev => { delete prev.details; return {...prev}; }); }}
                disabled={isUploading}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#80d6d1] transition-all text-gray-900 resize-none disabled:opacity-50"
              />
              {errors.details && <p className="text-[10px] text-red-500 mt-0.5 font-bold">{errors.details}</p>}
            </div>

            {/* Publish Button */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-[#006a66] hover:brightness-110 disabled:opacity-50 active:scale-98 text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              {isUploading ? 'Publicando...' : 'Publicar Agora'}
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