# 👨‍💻 Portfólio Agregador - Vinicius Pessoa

Este projeto é um site de portfólio pessoal desenvolvido com **React** e **Firebase**. Ele apresenta de forma interativa os meus conhecimentos, projetos e perfil profissional. A aplicação suporta múltiplos idiomas (Português e Inglês).

---

## Funcionalidades

- **Suporte a Idiomas**: alternância entre Português 🇧🇷 e Inglês 🇺🇸.
- **Perfil Pessoal**: imagem, apresentação e descrição carregadas do Firebase.
- **Projetos Categorizados**: exibe projetos agrupados por tipo.
- **Popup Detalhado**: exibição de detalhes em markdown do projeto ao clicar.
- **Integração com Firebase Firestore** para dados dinâmicos.

---

## Tecnologias Utilizadas  

- ⚛️ **React.js**
- 🔥 **Firebase Firestore**
- 📦 **Componentes Modulares React**  

---

## Banco de Dados Firebase (coleções)

- `Informations/{language}`: dados do perfil (`name`, `presentation`, `description`, `knowledge`, etc).
- `tipeALL/tipeALL`: array com tipos de projetos.
- `projects`: documentos contendo projetos com campos como `title`, `description`, `link`, `tipe`, `technology`.

---
