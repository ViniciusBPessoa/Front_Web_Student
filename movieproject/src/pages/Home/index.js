import { useEffect, useState } from 'react';
import api from '../../services/api';
import './home.css';

import Post from '../../components/Post';
import { FaSearch, FaTimes } from 'react-icons/fa';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState('');
  const [debouncedBusca, setDebouncedBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [generos, setGeneros] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState(null);

  useEffect(() => {
    api.get('genre/movie/list')
      .then(r => setGeneros(r.data.genres))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagina(1);
      setDebouncedBusca(busca);
    }, 500);
    return () => clearTimeout(timer);
  }, [busca]);

  useEffect(() => {
    async function loadFilmes() {
      setLoading(true);
      setError(null);
      try {
        const endpoint = debouncedBusca.trim() ? 'search/movie' : 'movie/now_playing';
        const params = debouncedBusca.trim()
          ? { query: debouncedBusca, page: pagina }
          : { page: pagina };

        const response = await api.get(endpoint, { params });
        let results = response.data.results;

        if (generoSelecionado) {
          results = results.filter(f => f.genre_ids?.includes(generoSelecionado));
        }

        setFilmes(results);
        setTotalPaginas(Math.min(response.data.total_pages, 500));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setError('Erro ao carregar filmes. Tente novamente mais tarde.');
        console.error('Erro na API:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, [debouncedBusca, pagina, generoSelecionado]);

  const handleClear = () => {
    setBusca('');
    setDebouncedBusca('');
    setPagina(1);
  };

  const handleGenero = (id) => {
    setGeneroSelecionado(g => g === id ? null : id);
    setPagina(1);
  };

  return (
    <div className="home-wrapper">
      {/* Hero — visível só quando não está buscando */}
      {!debouncedBusca && (
        <div className="home-hero">
          <h1 className="hero-title">Filmes em Cartaz</h1>
          <p className="hero-sub">Explore os melhores filmes nas telonas agora</p>
        </div>
      )}

      <div className="container">
        {debouncedBusca && (
          <h2 className="search-results-title">
            Resultados para <span>"{debouncedBusca}"</span>
          </h2>
        )}

        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar filmes..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
            {busca && (
              <button className="search-clear" onClick={handleClear} aria-label="Limpar busca">
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {generos.length > 0 && (
          <div className="generos-container">
            {generos.map(g => (
              <button
                key={g.id}
                className={`genero-btn${generoSelecionado === g.id ? ' active' : ''}`}
                onClick={() => handleGenero(g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
            <p>Carregando filmes...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : filmes.length === 0 ? (
          <div className="empty-container">
            <p className="empty-message">Nenhum filme encontrado.</p>
          </div>
        ) : (
          <>
            <div className="listaFilmes">
              {filmes.map(filme => (
                <Post
                  key={filme.id}
                  nome={filme.title}
                  imagem={filme.backdrop_path}
                  id={filme.id}
                  overview={filme.overview}
                  voteAverage={filme.vote_average}
                />
              ))}
            </div>

            <div className="pagination">
              <button
                className="page-btn"
                disabled={pagina === 1}
                onClick={() => setPagina(p => p - 1)}
              >
                ← Anterior
              </button>
              <span className="page-info">Página {pagina} de {totalPaginas}</span>
              <button
                className="page-btn"
                disabled={pagina >= totalPaginas}
                onClick={() => setPagina(p => p + 1)}
              >
                Próxima →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
