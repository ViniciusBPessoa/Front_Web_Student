import { useEffect, useState } from "react";
import api from "../../services/api";

function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "2dec5b8f560d2fe7a18ca46bdad98949",
                    language: "pt-BR",
                    page: 1,
                }
            });
            
            setFilmes(response.data.results); // Atualiza o estado com os filmes
        }

        loadFilmes();
    }, []); // Array de dependências vazio para executar apenas uma vez

    return (
        <div>
            <h1>Página Home</h1>
            {/* Exemplo de renderização dos filmes */}
            <ul>
                {filmes.map((filme) => (
                    <li key={filme.id}>
                        <h2>{filme.title}</h2>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} 
                            alt={filme.title}
                            width="200"
                        />
                        <p>{filme.overview}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;