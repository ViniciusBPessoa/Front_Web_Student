import React from 'react';
import './header.css';
import linkedin from './imgs/linkedin.png';
import gitHub from './imgs/gitHub.png';
import email from './imgs/email.png';

const Header = () => {
  const handleEmailClick = () => {
    const emailAddress = 'contato@vinicius.com';
    navigator.clipboard.writeText(emailAddress)
      .catch((err) => {
        console.error('Falha ao copiar e-mail:', err);
        // Fallback para navegadores antigos
        const textArea = document.createElement('textarea');
        textArea.value = emailAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      });
  };

  return (
    <header className="header-container">
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/vinicius-bezerra-b0920b284/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="LinkedIn" className="social-icon" />
        </a>
        <a
          href="https://github.com/ViniciusBPessoa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={gitHub} alt="GitHub" className="social-icon" />
        </a>
        <button
          onClick={handleEmailClick}
          className="social-icon-wrapper"
          aria-label="Copiar e-mail"
          title="Copiar e-mail"
        >
          <img src={email} alt="Ícone de e-mail" className="social-icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
