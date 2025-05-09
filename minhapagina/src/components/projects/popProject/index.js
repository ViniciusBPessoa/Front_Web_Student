import React from 'react';
import ReactMarkdown from 'react-markdown';

const popProject = ({ isOpen, onClose, title, description, link }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Markdown content */}
        <div className="p-4 overflow-y-auto flex-1">
          <ReactMarkdown className="prose">{description}</ReactMarkdown>
        </div>

        {/* Footer with button */}
        <div className="p-4 border-t flex justify-end">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Abrir Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default popProject; // Note a letra maiúscula aqui também