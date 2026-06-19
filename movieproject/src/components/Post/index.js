import { Link } from "react-router-dom";
import "./post.css";
import { FaStar, FaFilm } from "react-icons/fa";

function Post({ nome, imagem, id, overview, voteAverage }) {
  const textoResumo = overview
    ? (overview.length > 150 ? `${overview.substring(0, 150)}...` : overview)
    : 'Sem descrição disponível.';

  const nota = voteAverage > 0 ? voteAverage.toFixed(1) : 'N/A';

  return (
    <article className="post">
      <div className="post-image-container">
        {imagem ? (
          <img
            className="post-image"
            src={`https://image.tmdb.org/t/p/w780/${imagem}`}
            alt={nome}
            loading="lazy"
          />
        ) : (
          <div className="post-image-placeholder">
            <FaFilm />
            <span>Sem imagem</span>
          </div>
        )}
        <div className="rating-badge">
          <FaStar className="star-icon" />
          <span>{nota}</span>
        </div>
      </div>

      <div className="post-content">
        <h2 className="post-title">{nome}</h2>
        <p className="post-overview">{textoResumo}</p>
        <Link className="post-link" to={`/filme/${id}`}>
          Ver Detalhes
        </Link>
      </div>
    </article>
  );
}

export default Post;
