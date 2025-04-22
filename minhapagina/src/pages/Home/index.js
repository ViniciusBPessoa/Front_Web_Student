// minhapagina/src/pages/Home/Home.js
import React from 'react';
import './Home.css';
import Perfil from './imgs/perfil.png';

const Home = () => {
    return (
        <div className="home-container">
            <section className="profile-section">
                <div className="profile-content">
                    <div className='perfil-img'>
                        <img src={Perfil} alt="Vinicius Bezerra" className="perfil-icon" />
                    </div>
                    <div className='profile-text'>
                        <h1 className="home-title">Olá, eu sou o <span className="highlight">Vinicius Bezerra</span></h1>
                        <p className="home-description">
                        Sou estudante de Ciências da Computação na Universidade Federal Rural de Pernambuco (UFRPE), atualmente no sétimo período. Minha paixão pela inteligência artificial orientou a escolha das disciplinas opcionais ao longo do curso. Estou em busca da minha primeira experiência profissional, onde posso aplicar os conhecimentos adquiridos e continuar a aprender.

                        </p>
                    </div>
                </div>
            </section>

            <section className="knowledge-section">
                <h2 className="section-title">Conhecimentos</h2>
                <div className="knowledge-content">
                    <p className="knowledge-text">
                        Graduação em Ciências da Computação na Universidade Federal Rural de Pernambuco (UFRPE)
                    </p>
                    <p className="github-link">
                        Para mais informações sobre linguagens e frameworks, visite meu GitHub: 
                        <a href="https://github.com/ViniciusBPessoa" target="_blank" rel="noopener noreferrer">
                            ViniciusBPessoa
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;