import React, { useState } from "react";
import PopProject from "../../components/projects/popProject"; // Importando o componente PopProject

const TestPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Conteúdo markdown de exemplo
    const markdownContent = `
# Título do Projeto

Este é um **projeto de exemplo** com Markdown!

## Funcionalidades

- Modal responsivo
- Suporte a Markdown
- Botão de fechar
- Link externo

\`\`\`javascript
// Código de exemplo
const hello = () => {
    console.log("Hello World!");
}
\`\`\`
    `;

    return (
        <div className="flex items-center justify-center h-screen">
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Abrir Modal de Teste
            </button>

            <PopProject
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Projeto de Teste"
                description={markdownContent}
                link="https://github.com"
            />
        </div>
    );
};

export default TestPage;