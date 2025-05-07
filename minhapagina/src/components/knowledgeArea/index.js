import React from 'react';
import './KnowledgeSection.css';

const KnowledgeSection = ({ data }) => {
  return (
    <section className="knowledge-section">
      <h2 className="section-title">{data.knowledge || "Conhecimentos"}</h2>
      <div className="knowledge-content">
        <p className="knowledge-text">
          {data['knowledge-description'] || "Graduação em Ciências da Computação na Universidade Federal Rural de Pernambuco (UFRPE)"}
          {' '}
          <a 
            href={`https://github.com/${data.Github}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-link"
          >
            {data.Github || "ViniciusBPessoa"}
          </a>
        </p>
      </div>
    </section>
  );
};

export default KnowledgeSection;