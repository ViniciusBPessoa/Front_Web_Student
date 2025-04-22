import { Link } from "react-router-dom";
import "./post.css";

function Post(props){
    return(
        <div className="container">
            <article className="post" key={props.id}>
                <h1 className="nome">{props.nome}</h1>
                <img className="imagem" src={"https://image.tmdb.org/t/p/original/" + props.imagem} alt={props.nome}/>
                <Link className="link" to={`/filme/${props.id}`}>Acessar</Link>
            </article>

        </div>
    )
}

export default Post;