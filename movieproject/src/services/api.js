import axios from 'axios';

//  https://api.themoviedb.org/3
//  /movie/now_playing?api_key=2dec5b8f560d2fe7a18ca46bdad98949&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
