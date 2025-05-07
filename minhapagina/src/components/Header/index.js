import React from 'react';
import './header.css'; // Importa o CSS local

// Importa as imagens da pasta local 'imgs'
import linkedin from './imgs/linkedin.png';
import gitHub from './imgs/gitHub.png';
import email from './imgs/email.png';

const Header = () => {
  return (
    <header className="header-container">
      {/* Ícones das redes sociais (lado esquerdo) */}
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/vinicius-bezerra-b0920b284/" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="linkedin" className="social-icon" />
        </a>
        <a href="https://github.com/ViniciusBPessoa" target="_blank" rel="noopener noreferrer">
          <img src={gitHub} alt="github" className="social-icon" />
        </a>
        <a
          href="mailto:contato@vinicius.com"
          title="Enviar e-mail"
          aria-label="Enviar e-mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={email} alt="Ícone de e-mail" className="social-icon" />
        </a>
      </div>
    </header>
  );
};

export default Header;