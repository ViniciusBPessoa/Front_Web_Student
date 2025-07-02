// src/utils/copyEmail.js

export const copyEmailToClipboard = (email) => {
  navigator.clipboard.writeText(email).then(() => {
      alert('E-mail copiado para a área de transferência!');
    })
};
