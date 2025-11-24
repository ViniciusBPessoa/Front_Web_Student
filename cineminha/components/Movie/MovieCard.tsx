import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onSave: (movieId: number) => void;
  onDetails: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSave, onDetails }: MovieCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden flex h-48 border border-gray-700 hover:border-gray-500 transition-colors">
      {/* CAPA VERTICAL NA ESQUERDA */}
      <div className="w-32 md:w-40 flex-shrink-0 relative">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* NOTA COM ESTRELA - CANTO SUPERIOR ESQUERDO */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-80 px-2 py-1 rounded flex items-center gap-1">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-white text-sm font-bold">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      
      {/* INFOS NA DIREITA */}
      <div className="p-4 flex-1 flex flex-col">
        {/* CABEÇALHO COM TÍTULO E BOTÕES */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white line-clamp-2 flex-1 mr-2">
            {movie.title}
          </h3>
        </div>
        
        {/* DESCRIÇÃO */}
        <p className="text-gray-300 text-sm flex-1 line-clamp-3 mb-4">
          {movie.overview || "Descrição não disponível."}
        </p>
        
        {/* BOTÕES */}
        <div className="flex gap-2">
          <button 
            onClick={() => onSave(movie.id)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-bold text-white flex items-center gap-2 transition-colors"
          >
            💾 Salvar
          </button>
          <button 
            onClick={() => onDetails(movie)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-bold text-white flex items-center gap-2 transition-colors"
          >
            ▶️ Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}