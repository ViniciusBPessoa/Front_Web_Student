'use client';

import { useState, useEffect } from 'react';
import { getNowPlayingMovies } from '@/lib/api/tmdb';
import { Movie } from '@/types/movie';
import MovieGrid from '@/components/Movie/MovieGrid';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMovies = async (page: number) => {
    try {
      setLoading(true);
      const response = await getNowPlayingMovies(page);
      setMovies(response.movies);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setTotalResults(response.totalResults);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMovie = (movieId: number) => {
    console.log('Salvando filme:', movieId);
    alert(`Filme ${movieId} salvo! (Implementar backend depois)`);
  };

  const handleShowDetails = (movie: Movie) => {
    console.log('Abrindo detalhes do filme:', movie.title);
    alert(`Abrindo detalhes de: ${movie.title} (Implementar modal depois)`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      loadMovies(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      loadMovies(currentPage - 1);
    }
  };

  if (loading && movies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Carregando filmes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HEADER SIMPLES */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">🎬 IST MAX</h1>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Filmes em Cartaz</h2>
          <p className="text-gray-300">
            {totalResults} filmes encontrados • Página {currentPage} de {totalPages}
          </p>
        </div>

        {/* GRID DE FILMES */}
        {loading ? (
          <div className="text-center py-8">
            <div className="text-xl">Carregando mais filmes...</div>
          </div>
        ) : (
          <MovieGrid 
            movies={movies}
            onSaveMovie={handleSaveMovie}
            onShowDetails={handleShowDetails}
          />
        )}

        {/* PAGINAÇÃO */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || loading}
            className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-bold transition-colors"
          >
            ⬅️ Anterior
          </button>

          <span className="text-gray-300 font-medium">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || loading}
            className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-bold transition-colors"
          >
            Próxima ➡️
          </button>
        </div>

        {/* INFO DE CARREGAMENTO */}
        {loading && (
          <div className="text-center text-gray-400 mt-4">
            Carregando...
          </div>
        )}
      </main>
    </div>
  );
}