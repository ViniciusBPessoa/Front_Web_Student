import React from "react"

const Abalt = (entrada) => {
  return (
    <div>

      <h2>Nome: {entrada.nome}</h2>
      <h3>Idade: {entrada.idade}</h3>
      <h3>Cargo: {entrada.cargo}</h3>
      <hr/>
    </div>
  )
}



const Equipe = (entrada) => {
  return (
    <div>
      <Abalt nome = "Vinicius Pessoa" idade = "22" cargo = "Vagabundo"/>
      <Abalt nome = "Edivan Fodão" idade = "43" cargo = "Adiministrador"/>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <h1>Welcome to the React App</h1>
      <hr></hr>
      <Equipe></Equipe>
    </div>
  );
}
