// src/components/Header/index.js

import './header.css';
import linkedin from '../../imgs/linkedin.png';
import gitHub from '../../imgs/gitHub.png';
import email from '../../imgs/email.png';
import { copyEmailToClipboard } from '../../utils/copyEmailToClipboard';

const Header = () => {
  const handleEmailClick = () => {
    copyEmailToClipboard('vinicius.pessoa@example.com'); // substitua pelo seu e-mail real
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
