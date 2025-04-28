// minhapagina/src/pages/Home/Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import Perfil from './imgs/perfil.png';
import { db } from '../../components/firebase';
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "Informations", "portuguese");
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    setError("Documento não encontrado no Firebase");
                }
            } catch (err) {
                setError("Erro ao carregar dados: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!data) return <div className="error">Dados não disponíveis</div>;

    return (
        <div className="home-container">
            <section className="profile-section">
                <div className="profile-content">
                    <div className='perfil-img'>
                        <img src={Perfil} alt={data.name || "Vinicius Bezerra"} className="perfil-icon" />
                    </div>
                    <div className='profile-text'>
                        <h1 className="home-title">
                            {data.presentation || "Olá, eu sou o"} <span className="highlight">{data.name || "Vinicius Bezerra"}</span>
                        </h1>
                        <p className="home-description">
                            {data.description || "Sou estudante de Ciências da Computação..."}
                        </p>
                    </div>
                </div>
            </section>

            <section className="knowledge-section">
                <h2 className="section-title">{data.knowledge || "Conhecimentos"}</h2>
                <div className="knowledge-content">
                    <p className="knowledge-text">
                        {data['knowledge-description'] || "Graduação em Ciências da Computação na Universidade Federal Rural de Pernambuco (UFRPE)"}
                        {' '}
                        <a href={`https://github.com/${data.Github}`} target="_blank" rel="noopener noreferrer" className="github-link">
                            {data.Github || "ViniciusBPessoa"}
                        </a>
                    </p>
                </div>
            </section>

            <div>
                <h1>Projetos Desenvolvidos</h1>
            </div>
        </div>
    );
};

export default Home;