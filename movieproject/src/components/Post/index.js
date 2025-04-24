import { Link } from "react-router-dom";
import "./post.css";
import { FaStar } from "react-icons/fa";

function Post({ nome, imagem, id, overview, voteAverage }) {
  return (
    <article className="post">
      <div className="post-image-container">
        <img 
          className="post-image" 
          src={`https://image.tmdb.org/t/p/original/${imagem}`} 
          alt={nome}
          loading="lazy"
        />
        <div className="rating-badge">
          <FaStar className="star-icon" />
          <span>{voteAverage.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="post-content">
        <h2 className="post-title">{nome}</h2>
        <p className="post-overview">
          {overview.length > 150 ? `${overview.substring(0, 150)}...` : overview}
        </p>
        <Link className="post-link" to={`/filme/${id}`}>
          Ver Detalhes
        </Link>
      </div>
    </article>
  );
}

export default Post;