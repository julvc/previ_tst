import './App.css'
import { Master } from './components/Layout/Master';

function App() {
  return (
    <Master>
      <div className='home'>
        <h1>Gestión de Personas</h1>
        <div className='cards'>
          <div className='card'>
            <h3> Listar Personas </h3>
            <p>Visualiza todas las personas registradas en el sistema.</p>
            <button className='btn-primary'>Ver Personas</button>
        </div>
          <div className='card'>
            <h3> ➕ Crear Persona </h3>
            <p>Permite crear una nueva persona en el sistema.</p>
            <button className='btn-primary'>Crear Persona</button>
          </div>
        </div>
      </div>
    </Master>
  );
}

export default App;