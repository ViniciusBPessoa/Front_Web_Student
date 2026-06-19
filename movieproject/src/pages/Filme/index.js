import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaPlay, FaHeart, FaTrash } from 'react-icons/fa';
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
                const response = await api.get(`movie/${id}`);
                setFilme(response.data);
                const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
                setIsSaved(savedMovies.some(movie => movie.id === response.data.id));
            } catch (error) {
                console.log('Erro ao carregar filme:', error);
            } finally {
                setLoading(false);
            }
        }
        loadFilme();
    }, [id]);

    const toggleSaveMovie = () => {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        if (isSaved) {
            const updated = savedMovies.filter(movie => movie.id !== filme.id);
            localStorage.setItem('savedMovies', JSON.stringify(updated));
            setIsSaved(false);
        } else {
            const movieToSave = {
                id: filme.id,
                title: filme.title,
                poster_path: filme.poster_path,
                backdrop_path: filme.backdrop_path,
                overview: filme.overview,
                release_date: filme.release_date,
                vote_average: filme.vote_average,
                genres: filme.genres?.map(g => g.name) || []
            };
            localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, movieToSave]));
            setIsSaved(true);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="filme-container">
            <div className="filme-banner">
                {filme.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
                        alt={`Banner de ${filme.title}`}
                    />
                ) : (
                    <div className="filme-banner-placeholder" />
                )}
            </div>

            <div className="filme-content">
                <div className="filme-main-section">
                    {filme.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                            alt={`Poster de ${filme.title}`}
                            className="filme-poster"
                        />
                    ) : (
                        <div className="filme-poster-placeholder" />
                    )}

                    <div className="filme-side-info">
                        <h1 className="filme-title">{filme.title}</h1>

                        <div className="filme-details">
                            {filme.production_countries?.length > 0 && (
                                <span>{filme.production_countries[filme.production_countries.length - 1].name}</span>
                            )}
                            {filme.release_date && <span>{filme.release_date.split('-')[0]}</span>}
                            {filme.runtime > 0 && <span>{filme.runtime} min</span>}
                        </div>

                        <div className="filme-rating">
                            <FaStar className="rating-star" />
                            <span className="rating-value">{filme.vote_average?.toFixed(1)}</span>
                            <span className="rating-max">/ 10</span>
                        </div>

                        {filme.genres?.length > 0 && (
                            <div className="filme-genres">
                                {filme.genres.map(genre => (
                                    <span key={genre.id} className="genre-tag">{genre.name}</span>
                                ))}
                            </div>
                        )}

                        <div className="filme-actions">
                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.title + ' trailer')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="trailer-button"
                            >
                                <FaPlay /> Assistir Trailer
                            </a>
                            <button
                                className={`save-button${isSaved ? ' saved' : ''}`}
                                onClick={toggleSaveMovie}
                            >
                                {isSaved ? <><FaTrash /> Remover</> : <><FaHeart /> Salvar</>}
                            </button>
                        </div>

                        <div className="filme-text-info">
                            {filme.overview && (
                                <div className="filme-section">
                                    <h2>Sinopse</h2>
                                    <p>{filme.overview}</p>
                                </div>
                            )}
                            {filme.tagline && (
                                <div className="filme-section">
                                    <h2>Tagline</h2>
                                    <p className="tagline-text">"{filme.tagline}"</p>
                                </div>
                            )}
                            {filme.production_companies?.length > 0 && (
                                <div className="filme-section">
                                    <h2>Produção</h2>
                                    <div className="production-companies">
                                        {filme.production_companies.map(c => (
                                            <span key={c.id}>{c.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filme;
