import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`movie/${id}`, {
                    params: {
                        api_key: "2dec5b8f560d2fe7a18ca46bdad98949",
                        language: "pt-BR",
                    }
                });
                setFilme(response.data);
                setLoading(false);
                
                // Verificar se o filme já está salvo
                const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
                const isMovieSaved = savedMovies.some(movie => movie.id === response.data.id);
                setIsSaved(isMovieSaved);
            } catch (error) {
                console.log("Erro ao carregar filme: ", error);
                setLoading(false);
            }
        }

        loadFilme();
    }, [id]);

    const toggleSaveMovie = () => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        
        if (isSaved) {
            // Remover o filme
            const updatedMovies = savedMovies.filter(movie => movie.id !== filme.id);
            localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
            setIsSaved(false);
            alert('Filme removido da sua lista!');
        } else {
            // Adicionar o filme
            const movieToSave = {
                id: filme.id,
                title: filme.title,
                poster_path: filme.poster_path,
                backdrop_path: filme.backdrop_path,
                overview: filme.overview,
                release_date: filme.release_date,
                vote_average: filme.vote_average,
                genres: filme.genres?.map(genre => genre.name) || []
            };
            
            const updatedMovies = [...savedMovies, movieToSave];
            localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
            setIsSaved(true);
            alert('Filme salvo com sucesso!');
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filme...</h2>
            </div>
        )
    }

    return (
        <div className="filme-container">
            {/* Banner do filme */}
            <div className="filme-banner">
                <img 
                    src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} 
                    alt={`Banner de ${filme.title}`} 
                />
            </div>

            {/* Conteúdo principal */}
            <div className="filme-content">
                <div className="filme-main-section">
                    {/* Poster */}
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} 
                        alt={`Poster de ${filme.title}`} 
                        className="filme-poster"
                    />

                    {/* Informações ao lado do poster */}
                    <div className="filme-side-info">
                        <div className="filme-meta">
                            <h1>{filme.title}</h1>
                            
                            <div className="filme-details">
                                <span>
                                    {filme.production_countries?.length > 0 && 
                                        filme.production_countries[filme.production_countries.length - 1].name}
                                </span>
                                <span>{filme.release_date?.split('-')[0]}</span>
                                <span>{filme.runtime} min</span>
                            </div>

                            <div className="filme-rating">
                                <span className="rating-value">
                                    {filme.vote_average?.toFixed(1)}
                                </span>
                                <span>/10</span>
                            </div>
                        </div>

                        {/* Botões de ação */}
                        <div className="filme-actions">
                            <a 
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.title + ' trailer')}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="trailer-button"
                            >
                                Assistir Trailer
                            </a>
                            <button 
                                className={`save-button ${isSaved ? 'saved' : ''}`}
                                onClick={toggleSaveMovie}
                            >
                                {isSaved ? 'Remover' : 'Salvar'}
                            </button>
                        </div>

                        {/* Informações textuais */}
                        <div className="filme-text-info">
                            <div className="filme-overview">
                                <h2>Sinopse</h2>
                                <p>{filme.overview}</p>
                            </div>

                            <div className="filme-tagline">
                                <h3>Tagline</h3>
                                <p>{filme.tagline || "Não disponível"}</p>
                            </div>
                            
                            <div className="filme-production">
                                <h3>Produção</h3>
                                <div className="production-companies">
                                    {filme.production_companies?.map(company => (
                                        <span key={company.id}>{company.name}</span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Gêneros */}
                            <div className="filme-genres">
                                <h3>Gênero: </h3>
                                {filme.genres?.map(genre => (
                                    <span key={genre.id} className="genre-tag">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filme;