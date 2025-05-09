import React from "react";
import "./NotFoundPage.css"; // Importaremos o CSS abaixo

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Página não encontrada</h2>
                <p className="not-found-text">
                    Ops! Parece que você se perdeu no espaço.
                </p>
                <a href="/" className="not-found-button">
                    Voltar para a home page
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;