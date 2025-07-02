import React from 'react';
import './footer.css';
// Importe seus ícones (ajuste os caminhos)
import githubIcon from './imgs/gitHub.png';
import linkedinIcon from './imgs/linkedin.png';
import emailIcon from './imgs/email.png'; // Importe o ícone de e-mail

const Footer = () => {
  const handleEmailClick = () => {
    const emailAddress = 'contato@vinicius.com'; // Mesmo e-mail do Header
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        alert('E-mail copiado para a área de transferência!');
      })
      .catch((err) => {
        console.error('Falha ao copiar e-mail: ', err);
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = emailAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('E-mail copiado para a área de transferência!');
      });
  };

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