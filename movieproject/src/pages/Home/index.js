import { useEffect, useState } from 'react';
import api from '../../services/api';
import './home.css';

import Post from '../../components/Post';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFilmes() {
      try {
        const response = await api.get("movie/now_playing", {
          params: {
            api_key: "2dec5b8f560d2fe7a18ca46bdad98949", // Insira sua chave de API aqui
            language: "pt-BR",
            page: 1,
          }
        });
        setFilmes(response.data.results);
      } catch (err) {
        setError("Erro ao carregar filmes. Tente novamente mais tarde.");
        console.error("Erro na API:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFilmes();
  }, []); // Adicionado array de dependências vazio para executar apenas uma vez

  if (loading) {
    return (
      <div className="container loading-container">
        <div className="spinner"></div>
        <p>Carregando filmes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Filmes em Cartaz</h1>
      <div className="listaFilmes">
        {filmes.map((filme) => (
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
    </div>
  );
}

export default Home;