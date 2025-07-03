import toast from 'react-hot-toast';

const copiedMSG = ['E-mail copied successfully!', 'E-mail copiado com sucesso!'];

export const copyEmailToClipboard = (email) => {
  const lang = sessionStorage.getItem("language");

  navigator.clipboard.writeText(email).then(() => {
    toast.success(lang === 'english' ? copiedMSG[0] : copiedMSG[1]);
  })
};
