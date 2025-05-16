import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  FaTimes,
  FaExternalLinkAlt,
  FaCode,
  FaGlobe,
} from 'react-icons/fa';
import './popProject.css';

const PopProject = ({
  isOpen,
  onClose,
  title = 'Meu Portfólio Pessoal',
  description = '',
  technologies = [],
  link = '',
  type = 'WEB',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="popup-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup-content">
        <div className="popup-header">
          <h2 className="popup-title">{title}</h2>
          <button
            onClick={onClose}
            className="popup-close-btn"
            aria-label="Fechar popup"
          >
            <FaTimes />
          </button>
        </div>

        <div className="popup-body">
          <div className="popup-details">
            <div className="detail-row">
              <FaGlobe className="detail-icon" />
              <span className="detail-label">Tipo:</span>
              <span className="type-value">{type}</span>
            </div>

            {technologies.length > 0 && (
              <div className="detail-row">
                <FaCode className="detail-icon" />
                <span className="detail-label">Tecnologias:</span>
                <div className="tech-tags">
                  {technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="description-section">
              <h3 className="section-title">Descrição</h3>
              <div className="description-text markdown-content">
                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {link && (
          <div className="popup-footer">
            <a
              href={link}
              className="popup-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt className="link-icon" />
              <span>Ver no GitHub</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopProject;