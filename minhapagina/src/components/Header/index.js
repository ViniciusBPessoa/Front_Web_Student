import './header.css';

import linkedin from './imgs/linkedin.png';
import gitHub from './imgs/gitHub.png';
import email from './imgs/email.png';

import { copyEmailToClipboard } from '../../utils/copyEmailToClipboard';

const Header = () => {
  const handleEmailClick = () => {
    copyEmailToClipboard('viniciusbpessoa02@gmail.com');
  };

  return (
    <header className="header-container">
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/vinicius-b-pessoa/"
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
