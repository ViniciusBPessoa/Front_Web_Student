import React, {Component} from 'react';
import './style.css'

// Carrega a imagem
import relogio from './assets/cronometro.png';

class App extends Component{
  render(){
    return (
      <div className='container'>
        <h1>Meu relogio</h1>
        <img src={relogio} alt="Cronometro" className='img'/>
        <a className='timer'>0.0</a>

        <div className='areaBotoes'>
          <button>Iniciar</button>
          <button>Parar</button>
        </div>

      </div>
    );
  }
}

export default App;
