import React, { useState, useEffect } from 'react';
import PopProject from '../../components/projects/popProject';
import ProjectTypeSection from '../../components/projects/ProjectTypeSection';
import './TestPage.css';
import { db } from '../../components/firebase';
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

function TestPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]); // Tipos (WEB, MOBILE, etc.)
  const [allProjects, setAllProjects] = useState([]); // Todos os projetos
  const [selectedProject, setSelectedProject] = useState(null);

  // Busca TIPOS e PROJETOS do Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Busca os TIPOS (tipeALL)
        const typesDoc = await getDoc(doc(db, "tipeALL", "tipeALL"));
        if (typesDoc.exists()) {
          setProjectTypes(typesDoc.data().tipeALL || []); // Nome do array: tipeALL
        }

        // 2. Busca TODOS os projetos
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectsList = [];
        projectsSnapshot.forEach((doc) => {
          projectsList.push({ id: doc.id, ...doc.data() });
        });
        setAllProjects(projectsList);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Filtra projetos por tipo
  const getProjectsByType = (type) => {
    return allProjects.filter(project => project.tipe === type); // Campo "tipe" (com "i")
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div className="test-page">
      <h1 className="text-apresentation">Meus Projetos</h1>

      {/* Renderiza uma seção para cada tipo */}
      {projectTypes.map((type) => (
        <ProjectTypeSection
          key={type}
          type={type}
          projects={getProjectsByType(type)}
          onProjectClick={handleProjectClick}
        />
      ))}

      {/* Popup */}
      {selectedProject && (
        <PopProject
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          title={selectedProject.title}
          description={selectedProject.description}
          technologies={selectedProject.technology}
          link={selectedProject.link}
          type={selectedProject.tipe}
        />
      )}
    </div>
  );
}

export default TestPage;