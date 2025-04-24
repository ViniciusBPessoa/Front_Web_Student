import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favoritos.css';

function FilmesSalvos() {
  const [filmesSalvos, setFilmesSalvos] = useState([]);

  useEffect(() => {
    // Carrega os filmes salvos do localStorage quando o componente monta
    const filmes = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setFilmesSalvos(filmes);
  }, []);

  const removerFilme = (id) => {
    // Filtra o filme a ser removido
    const novaLista = filmesSalvos.filter(filme => filme.id !== id);
    
    // Atualiza o localStorage e o estado
    localStorage.setItem('savedMovies', JSON.stringify(novaLista));
    setFilmesSalvos(novaLista);
      };

  return (
    <div className="container-salvos">
      <h1 className="titulo-salvos">Meus Filmes Salvos</h1>
      
      {filmesSalvos.length === 0 ? (
        <div className="sem-filmes">
          <p>Você ainda não salvou nenhum filme.</p>
          <Link to="/" className="link-home">Voltar para a página inicial</Link>
        </div>
      ) : (
        <div className="lista-filmes-salvos">
          {filmesSalvos.map((filme) => (
            <div key={filme.id} className="card-filme-salvo">
              <img 
                src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} 
                alt={`Poster de ${filme.title}`} 
                className="poster-salvo"
              />
              
              <div className="info-filme-salvo">
                <h2>{filme.title}</h2>
                <p className="nota-salvo">Nota: {filme.vote_average?.toFixed(1)}/10</p>
                <p className="ano-salvo">Ano: {filme.release_date?.split('-')[0]}</p>
                
                <div className="botoes-filme-salvo">
                  <Link 
                    to={`/filme/${filme.id}`} 
                    className="botao-ver-mais"
                  >
                    Ver mais
                  </Link>
                  
                  <button 
                    onClick={() => removerFilme(filme.id)}
                    className="botao-remover"
                  >
                    Remover
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