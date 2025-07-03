import React, { useState, useEffect } from 'react';
import './Home.css';

// Imagem de perfil local
import Perfil from './imgs/perfil.png';

// Importa conexão com o Firebase Firestore
import { db } from '../../components/firebase';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// Importa componentes reutilizáveis da aplicação
import KnowledgeSection from '../../components/knowledgeArea';
import PopProject from '../../components/projects/popProject';
import ProjectTypeSection from '../../components/projects/ProjectTypeSection';

const Home = () => {
    // Define o idioma atual, carregando o valor salvo no sessionStorage ou default para "portuguese"
    const [language, setLanguage] = useState(() => {
        return sessionStorage.getItem("language") || "portuguese";
    });

    // Estado para armazenar os dados principais do perfil (nome, descrição, etc.)
    const [data, setData] = useState(null);

    // Estado de carregamento da página
    const [loading, setLoading] = useState(true);

    // Armazena mensagens de erro, se houver
    const [error, setError] = useState(null);

    // Controla o efeito visual de troca de idioma
    const [isChanging, setIsChanging] = useState(false);

    // Controla a exibição do popup de projeto
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Lista com os tipos de projeto (ex: Web, Mobile, etc.)
    const [projectTypes, setProjectTypes] = useState([]);

    // Lista com todos os projetos carregados do Firebase
    const [allProjects, setAllProjects] = useState([]);

    // Projeto selecionado para ser exibido no popup
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Define o nome da collection com base no idioma
                const collectionName = language === "english" ? "projects-ing" : "projects";

                // Faz 3 requisições ao Firebase em paralelo:
                // 1. Dados do perfil
                // 2. Tipos de projeto
                // 3. Lista de projetos
                const [profileDoc, typesDoc, projectsSnap] = await Promise.all([
                    getDoc(doc(db, "Informations", language)),
                    getDoc(doc(db, "tipeALL", "tipeALL")),
                    getDocs(collection(db, collectionName)),
                ]);

                // Verifica se o documento de perfil existe
                if (profileDoc.exists()) {
                    setData(profileDoc.data()); // Salva os dados na seção de atual
                    setError(null);
                } else {
                    setError("Documento não encontrado no Firebase");
                }

                // Define os tipos de projeto ou um array vazio se não encontrar
                setProjectTypes(typesDoc.exists() ? typesDoc.data().tipeALL || [] : []);

                // Mapeia os projetos para um array de objetos com ID
                const projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllProjects(projects);
            } catch (err) {
                setError("Erro ao carregar dados: " + err.message); // Erro ao carregar dados
            } finally {
                setLoading(false); // Esconde o carregamento
            }
        };

        fetchData(); // Chama a função assíncrona
    }, [language]); // Só roda quando o idioma mudar

    // Função que altera o idioma da interface
    const changeLanguage = (lang) => {
        if (language !== lang) {
            setIsChanging(true); // Ativa a animação
            setTimeout(() => {
                sessionStorage.setItem("language", lang); // Salva no sessionStorage
                setLanguage(lang); // Atualiza o estado
                setIsChanging(false); // Encerra animação
            }, 200); // Delay para efeito visual
        }
    };

    // Filtra os projetos por tipo
    const getProjectsByType = (type) =>
        allProjects.filter(project => project.tipe === type);

    // Enquanto carrega, exibe tela de carregamento
    if (loading) return <div className="loading">Carregando...</div>;

    // Se ocorrer erro, mostra a mensagem
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

                {/* Para cada tipo de projeto, renderiza um grupo de cards */}
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

            {/* Popup com informações do projeto selecionado */}
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
