import React, { useState, useEffect } from 'react';
import './Home.css';
import Perfil from './imgs/perfil.png';
import { db } from '../../components/firebase';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import KnowledgeSection from '../../components/knowledgeArea';
import PopProject from '../../components/projects/popProject';
import ProjectTypeSection from '../../components/projects/ProjectTypeSection';

const Home = () => {
    const [language, setLanguage] = useState("portuguese");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isChanging, setIsChanging] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [projectTypes, setProjectTypes] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Busca informações do perfil
                const docRef = doc(db, "Informations", language);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data());
                    setError(null);
                } else {
                    setError("Documento não encontrado no Firebase");
                    setData(null);
                }

                // Busca tipos de projetos
                const typesDoc = await getDoc(doc(db, "tipeALL", "tipeALL"));
                if (typesDoc.exists()) {
                    setProjectTypes(typesDoc.data().tipeALL || []);
                }

                // Busca todos os projetos
                const projectsSnapshot = await getDocs(collection(db, "projects"));
                const projectsList = [];
                projectsSnapshot.forEach((doc) => {
                    projectsList.push({ id: doc.id, ...doc.data() });
                });
                setAllProjects(projectsList);
            } catch (err) {
                setError("Erro ao carregar dados: " + err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    const getProjectsByType = (type) => {
        return allProjects.filter(project => project.tipe === type);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => setIsPopupOpen(false);

    const changeLanguage = (lang) => {
        if (language !== lang) {
            setIsChanging(true);
            setTimeout(() => {
                setLanguage(lang);
                setIsChanging(false);
            }, 200);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!data) return <div className="error">Dados não disponíveis</div>;

    return (
        <div className="home-container">
            {/* Seletor de Idiomas Premium */}
            <div className="language-selector-wrapper">
                <div className={`language-selector ${isChanging ? "changing" : ""}`}>
                    <button
                        onClick={() => changeLanguage("portuguese")}
                        className={`language-option ${language === "portuguese" ? "active" : ""}`}
                        aria-label="Português"
                    >
                        <span className="flag">🇧🇷</span>
                        <span className="language-name">Português</span>
                    </button>
                    
                    <div className="divider"></div>
                    
                    <button
                        onClick={() => changeLanguage("english")}
                        className={`language-option ${language === "english" ? "active" : ""}`}
                        aria-label="English"
                    >
                        <span className="flag">🇺🇸</span>
                        <span className="language-name">English</span>
                    </button>
                </div>
            </div>

            {/* Seção de Perfil */}
            <section className="profile-section">
                <div className="profile-content">
                    <div className="perfil-img">
                        <img
                            src={Perfil}
                            alt={data.name || "Vinicius Bezerra"}
                            className="perfil-icon"
                        />
                    </div>
                    <div className="profile-text">
                        <h1 className="home-title">
                            {data.presentation || "Olá, eu sou o"}{" "}
                            <span className="highlight">
                                {data.name || "Vinicius Bezerra"}
                            </span>
                        </h1>
                        <p className="home-description">
                            {data.description || "Sou estudante de Ciências da Computação..."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Seção de Conhecimentos */}
            <KnowledgeSection data={data} />

            {/* Seção de Projetos */}
            <div className="projects-section">
                <h1 className="Project-Area">
                    {language === "portuguese" ? "Projetos Desenvolvidos" : "Developed Projects"}
                </h1>
                
                {/* Renderiza uma seção para cada tipo de projeto */}
                {projectTypes.map((type) => (
                    <ProjectTypeSection
                        key={type}
                        type={type}
                        projects={getProjectsByType(type)}
                        onProjectClick={handleProjectClick}
                    />
                ))}
            </div>

            {/* Popup do projeto selecionado */}
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
};

export default Home;