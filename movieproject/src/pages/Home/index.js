import { useEffect, useState} from 'react';
import api from '../../services/api';
import './home.css';

import Post from '../../components/Post';

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR


function Home(){
  const [filmes, setFilmes] = useState([]);

  useEffect(()=>{

    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
         api_key: "2dec5b8f560d2fe7a18ca46bdad98949",
         language: "pt-BR",
         page: 1,
        }
      })

      setFilmes(response.data.results);

    }

    loadFilmes();

  })

  return(
    <div className="container">
      <div className="listaFilmes">
        {filmes.map((filme) => {
          return(

            <Post nome = {filme.title} imagem = {filme.backdrop_path} id = {filme.id}/>
          )
        })}
      </div>
    </div>
  )
}

export default Home;