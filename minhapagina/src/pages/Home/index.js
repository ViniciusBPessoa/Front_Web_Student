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
            try {
                setLoading(true);

                // Alterna entre collections com base na linguagem
                const collectionName = language === "english" ? "projects-ing" : "projects";

                const [profileDoc, typesDoc, projectsSnap] = await Promise.all([
                    getDoc(doc(db, "Informations", language)),
                    getDoc(doc(db, "tipeALL", "tipeALL")),
                    getDocs(collection(db, collectionName)),
                ]);

                if (profileDoc.exists()) {
                    setData(profileDoc.data());
                    setError(null);
                } else {
                    setError("Documento não encontrado no Firebase");
                }

                setProjectTypes(typesDoc.exists() ? typesDoc.data().tipeALL || [] : []);

                const projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllProjects(projects);
            } catch (err) {
                setError("Erro ao carregar dados: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    const changeLanguage = (lang) => {
        if (language !== lang) {
            setIsChanging(true);
            setTimeout(() => {
                setLanguage(lang);
                setIsChanging(false);
            }, 200);
        }
    };

    const getProjectsByType = (type) =>
        allProjects.filter(project => project.tipe === type);

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home-container">
            {/* Seletor de Idiomas */}
            <div className="language-selector-wrapper">
                <div className={`language-selector ${isChanging ? "changing" : ""}`}>
                    <button
                        onClick={() => changeLanguage("portuguese")}
                        className={`language-option ${language === "portuguese" ? "active" : ""}`}
                        aria-label="Português"
                    >
                        <span className="flag" role="img" aria-label="Bandeira do Brasil">🇧🇷</span>
                        <span className="language-name">Português</span>
                    </button>

                    <div className="divider"></div>

                    <button
                        onClick={() => changeLanguage("english")}
                        className={`language-option ${language === "english" ? "active" : ""}`}
                        aria-label="English"
                    >
                        <span className="flag" role="img" aria-label="Bandeira dos EUA">🇺🇸</span>
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
                            alt={data?.name || "Vinicius Bezerra"}
                            className="perfil-icon"
                        />
                    </div>
                    <div className="profile-text">
                        <h1 className="home-title">
                            {data?.presentation || "Olá, eu sou o"}{" "}
                            <span className="highlight">
                                {data?.name || "Vinicius Bezerra"}
                            </span>
                        </h1>
                        <p className="home-description">
                            {data?.description || "Sou estudante de Ciências da Computação..."}
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

                {projectTypes.map(type => (
                    <ProjectTypeSection
                        key={type}
                        type={type}
                        projects={getProjectsByType(type)}
                        onProjectClick={(project) => {
                            setSelectedProject(project);
                            setIsPopupOpen(true);
                        }}
                    />
                ))}
            </div>

            {/* Popup de Projeto */}
            {selectedProject && (
                <PopProject
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
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
