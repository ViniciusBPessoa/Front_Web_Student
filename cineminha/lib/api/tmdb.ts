import axios from 'axios';

const TMDB_API_KEY = '2dec5b8f560d2fe7a18ca46bdad98949';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbAPI = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'pt-BR'
  }
});

// 🎬 PEGA FILMES EM CARTAZ - AGORA MESMO!
export const getNowPlayingMovies = async (page: number = 1) => {
  const response = await tmdbAPI.get('/movie/now_playing', {
    params: { page }
  });
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
    currentPage: response.data.page,
    totalResults: response.data.total_results
  };
};

// 🔍 BUSCA FILMES - NA HORA!
export const searchMovies = async (query: string) => {
  const response = await tmdbAPI.get('/search/movie', {
    params: { query }
  });
  return response.data.results;
};

// 📱 PEGA DETALHES COMPLETOS DO FILME
export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbAPI.get(`/movie/${movieId}`);
  return response.data;
};

