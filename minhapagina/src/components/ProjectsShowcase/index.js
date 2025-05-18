import React, { useState, useEffect } from 'react';
import PopProject from './PopProject'; // Ajuste o caminho conforme sua estrutura
import ProjectTypeSection from './ProjectTypeSection';
import { db } from '../firebase'; // Ajuste o caminho
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import './ProjectsShowcase.css'; // CSS específico (opcional)

const ProjectsShowcase = ({ sectionTitle = "Meus Projetos" }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca tipos e projetos em paralelo para melhor performance
        const [typesSnapshot, projectsSnapshot] = await Promise.all([
          getDoc(doc(db, "tipeALL", "tipeALL")),
          getDocs(collection(db, "projects"))
        ]);

        if (typesSnapshot.exists()) {
          setProjectTypes(typesSnapshot.data().tipeALL || []);
        }

        const projectsList = [];
        projectsSnapshot.forEach((doc) => {
          projectsList.push({ id: doc.id, ...doc.data() });
        });
        setAllProjects(projectsList);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProjectsByType = (type) => {
    return allProjects.filter(project => project.tipe === type);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => setIsPopupOpen(false);

  if (isLoading) return <div className="loading-spinner">Carregando...</div>;

  return (
    <section className="projects-showcase">
      <h2 className="showcase-title">{sectionTitle}</h2>

      {projectTypes.map((type) => {
        const typeProjects = getProjectsByType(type);
        return typeProjects.length > 0 && (
          <ProjectTypeSection
            key={type}
            type={type}
            projects={typeProjects}
            onProjectClick={handleProjectClick}
          />
        );
      })}

      {selectedProject && (
        <PopProject
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          {...selectedProject}
        />
      )}
    </section>
  );
};

export default ProjectsShowcase;