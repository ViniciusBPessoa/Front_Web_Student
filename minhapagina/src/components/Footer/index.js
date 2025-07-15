import React from 'react';
import './footer.css';
import githubIcon from './imgs/gitHub.png';
import linkedinIcon from './imgs/linkedin.png';
import emailIcon from './imgs/email.png';
import { copyEmailToClipboard } from '../../utils/copyEmailToClipboard';

const Footer = () => {
  const handleEmailClick = () => {
    copyEmailToClipboard("viniciusbpessoa02@gmail.com");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Links sociais no footer */}
        <div className="social-links">
          <a href="https://github.com/ViniciusBPessoa" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/vinicius-b-pessoa/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <button
            onClick={handleEmailClick}
            className="social-icon-wrapper"
            title="Copiar e-mail"
            aria-label="Copiar e-mail"
          >
            <img src={emailIcon} alt="E-mail" className="social-icon" />
          </button>
        </div>

        {/* Link para topo */}
        <div className="back-to-top">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            ↑ Voltar ao topo
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
