import React, { useState } from 'react';
import PopProject from '../../components/projects/popProject';
import './TestPage.css';

function TestPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div className="test-page">
      <h1 className="text-apresentation">Página de Teste</h1>

      <button onClick={handleOpenPopup} className="open-popup-btn">
        Abrir Popup
      </button>

      <PopProject
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title="Título Exemplo"
        description={`Um site currículo moderno e responsivo, desenvolvido para exibir meus projetos, habilidades e experiência profissional.

**Tecnologias e Recursos**
🔹 Front-end: React ou Next.js com TypeScript.  
🔹 Design: Tailwind CSS ou Styled Components.  
🔹 Integração: Firebase Firestore para dados dinâmicos.  
🔹 SEO Otimizado para o Google.  
🔹 Dark Mode: alternância entre temas claro e escuro.

**Objetivo**: Apresentar meu trabalho de forma elegante e interativa, facilitando o contato de recrutadores.`}
        technologies={['React.js', 'Firebase']}
        date="2023"
        link="https://github.com/ViniciusBPessoa/Web_Student/tree/main/minhapagina"
        type="WEB"
      />
    </div>
  );
}

export default TestPage;
