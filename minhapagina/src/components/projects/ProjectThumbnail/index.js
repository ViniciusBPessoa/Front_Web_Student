import React from 'react';
import './ProjectThumbnail.css';

// Função para remover markdown e truncar texto
const cleanAndTruncate = (text = '', maxLength = 150) => {
  if (!text) return '';
  
  // Remove markdown (simplificado)
  const cleanText = text
    .replace(/\*\*/g, '')  // Remove negrito
    .replace(/\*/g, '')    // Remove itálico
    .replace(/#/g, '')     // Remove headers
    .replace(/🔹/g, '•')   // Substitui emojis por bullets
    .replace(/\[.*?\]\(.*?\)/g, ''); // Remove links Markdown
  
  // Trunca o texto
  return cleanText.length > maxLength 
    ? `${cleanText.substring(0, maxLength)}...` 
    : cleanText;
};

const ProjectThumbnail = ({ project, onClick }) => {
  return (
    <div className="project-thumbnail" onClick={onClick}>
      <h3 className="thumbnail-title">{project.title}</h3>
      <p className="thumbnail-description">
        {cleanAndTruncate(project.description)}
      </p>
    </div>
  );
};

export default ProjectThumbnail;