# 🎬 SadFlix - Catálogo de Filmes

Aplicação React que consome a API do TMDB para exibir filmes atualmente em cartaz, com detalhes como avaliação, sinopse e pôsteres, além de salvar os filmes mais desejados em uma lista própria.

## Funcionalidades

- Listagem de filmes em cartaz
- Visualização de detalhes como:
  - Título
  - Avaliação (vote average)
  - Sinopse (overview)
  - Imagem de fundo (backdrop)
- Loader durante carregamento
- Tratamento de erros

## Tecnologias Utilizadas

- ⚛️ React.js (Hooks: useState, useEffect)
- 🔥 TMDB API (The Movie Database)

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/filmflix.git

# Instale as dependências
npm install

# Execute o projeto
npm start
```
## 🔑 Configuração da API

Siga estes passos para configurar sua chave da API:

1. Obtenha uma API_KEY gratuita no [TMDB](https://www.themoviedb.org/settings/api)
2. No arquivo `src/services/api.js`, cole sua chave:

```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'COLE_SUA_CHAVE_AQUI', // 👈 Substitua por sua chave
    language: 'pt-BR'
  }
});

export default api;
```
