import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaTrash } from 'react-icons/fa';
import './Favoritos.css';

function FilmesSalvos() {
  const [filmesSalvos, setFilmesSalvos] = useState([]);

  useEffect(() => {
    const filmes = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setFilmesSalvos(filmes);
  }, []);

  const removerFilme = (id) => {
    const novaLista = filmesSalvos.filter(filme => filme.id !== id);
    localStorage.setItem('savedMovies', JSON.stringify(novaLista));
    setFilmesSalvos(novaLista);
  };

  return (
    <div className="favoritos-container">
      <div className="favoritos-header">
        <FaHeart className="favoritos-icon" />
        <h1>Meus Filmes Salvos</h1>
        {filmesSalvos.length > 0 && (
          <span className="favoritos-count">{filmesSalvos.length} {filmesSalvos.length === 1 ? 'filme' : 'filmes'}</span>
        )}
      </div>

      {filmesSalvos.length === 0 ? (
        <div className="sem-filmes">
          <div className="sem-filmes-icon">
            <FaHeart />
          </div>
          <h2>Nenhum filme salvo ainda</h2>
          <p>Explore o catálogo e salve os filmes que você quer assistir.</p>
          <Link to="/" className="link-home">Explorar filmes</Link>
        </div>
      ) : (
        <div className="lista-filmes-salvos">
          {filmesSalvos.map((filme) => (
            <div key={filme.id} className="card-salvo">
              <div className="card-poster-wrapper">
                {filme.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`}
                    alt={`Poster de ${filme.title}`}
                    className="card-poster"
                    loading="lazy"
                  />
                ) : (
                  <div className="card-poster-placeholder">
                    <FaHeart />
                  </div>
                )}
                {filme.vote_average > 0 && (
                  <div className="card-rating-badge">
                    <FaStar />
                    <span>{filme.vote_average.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="card-info">
                <h2 className="card-title">{filme.title}</h2>

                <div className="card-meta">
                  {filme.release_date && (
                    <span className="card-year">{filme.release_date.split('-')[0]}</span>
                  )}
                </div>

                {filme.genres?.length > 0 && (
                  <div className="card-genres">
                    {filme.genres.slice(0, 3).map((g, i) => (
                      <span key={i} className="card-genre-tag">{g}</span>
                    ))}
                  </div>
                )}

                <div className="card-buttons">
                  <Link to={`/filme/${filme.id}`} className="btn-detalhes">
                    Ver detalhes
                  </Link>
                  <button
                    onClick={() => removerFilme(filme.id)}
                    className="btn-remover"
                    aria-label="Remover filme"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilmesSalvos;
