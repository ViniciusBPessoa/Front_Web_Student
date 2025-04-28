// updateFirebaseEnglish.js
import { db } from './src/components/firebase';
import { doc, setDoc } from "firebase/firestore";

const updateEnglishVersion = async () => {
  try {
    // Dados em inglês (substitua com suas traduções)
    const englishData = {
      Github: "ViniciusBPessoa", // Mantém o mesmo
      description: "I'm a Computer Science student at the Federal Rural University of Pernambuco (UFRPE), currently in my seventh semester. My passion for artificial intelligence has guided my choice of elective courses throughout the program. I'm looking for my first professional experience where I can apply the knowledge I've acquired and continue learning.",
      knowledge: "Knowledge",
      "knowledge-description": "Bachelor's degree in Computer Science at the Federal Rural University of Pernambuco (UFRPE) For more information about languages and frameworks, visit my GitHub:",
      name: "Vinicius Bezerra", // Mantém o mesmo
      presentation: "Hello, I'm"
    };

    // Referência para o documento english na coleção Informations
    const docRef = doc(db, "Informations", "english");
    
    // Adiciona ou atualiza o documento
    await setDoc(docRef, englishData);
    
    console.log("Versão em inglês atualizada com sucesso no Firebase!");
  } catch (error) {
    console.error("Erro ao atualizar versão em inglês:", error);
  }
};

// Executa a função
updateEnglishVersion();