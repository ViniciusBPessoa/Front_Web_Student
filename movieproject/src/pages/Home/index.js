import { useEffect, useState} from 'react';
import api from '../../services/api';

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR


function Home(){
  // const [filmes, setFilmes] = useState([]);

  useEffect(()=>{

    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
         api_key: "2dec5b8f560d2fe7a18ca46bdad98949",
         language: "pt-BR",
         page: 1,
        }
      })
    }

    loadFilmes();

  })

  return(
    <div>
      <h1>BEM VINDO A HOME</h1>
    </div>
  )
}

export default Home;