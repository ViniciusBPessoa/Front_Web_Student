import React from 'react';
import './footer.css';
// Importe seus ícones (ajuste os caminhos)
import githubIcon from './imgs/gitHub.png';
import linkedinIcon from './imgs/linkedin.png';
import emailIcon from './imgs/email.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Links sociais no footer */}
        <div className="social-links">
          <a href="https://github.com/ViniciusBPessoa" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/vinicius-bezerra-b0920b284/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <a href="mailto:contato@vinicius.com" target="_blank" rel="noopener noreferrer">
            <img src={emailIcon} alt="Email" className="social-icon" />
          </a>
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