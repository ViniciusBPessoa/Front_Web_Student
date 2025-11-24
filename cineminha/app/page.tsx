'use client';

import { useState, useEffect } from 'react';
import { getNowPlayingMovies } from '@/lib/api/tmdb';
import { Movie } from '@/types/movie';
import MovieGrid from '@/components/Movie/MovieGrid';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const moviesData = await getNowPlayingMovies();
      setMovies(moviesData);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMovie = (movieId: number) => {
    // TODO: Implementar salvamento
    console.log('Salvando filme:', movieId);
    alert(`Filme ${movieId} salvo! (Implementar backend depois)`);
  };

  const handleShowDetails = (movie: Movie) => {
    // TODO: Abrir modal de detalhes
    console.log('Abrindo detalhes do filme:', movie.title);
    alert(`Abrindo detalhes de: ${movie.title} (Implementar modal depois)`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Carregando filmes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HEADER SIMPLES */}
      <header className="bg-red-600 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">🎬 IST MAX - ESTILO 2 (CAMPEÃO!)</h1>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Filmes em Cartaz</h2>
          <p className="text-gray-300">
            {movies.length} filmes encontrados
          </p>
        </div>

        <MovieGrid 
          movies={movies}
          onSaveMovie={handleSaveMovie}
          onShowDetails={handleShowDetails}
        />
      </main>
    </div>
  );
}