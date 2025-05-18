import React from 'react';
import ProjectThumbnail from '../ProjectThumbnail';
import './ProjectTypeSection.css';

const ProjectTypeSection = ({ type, projects, onProjectClick }) => {
  if (!projects.length) return null; // Não renderiza se não houver projetos

  return (
    <div className="type-section">
      <h2 className="type-title">{type}</h2>
      <div className="projects-scroll-container">
        {projects.map((project) => (
          <ProjectThumbnail
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTypeSection;