import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RegionesPage } from './pages/RegionesPage';
import { ComunasPage } from './pages/ComunasPage';
import { HomePage } from './pages/HomePage';
import { AcercaDePage } from './pages/AcercaDePage';
import { PersonasPage } from './pages/PersonasPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="/regiones" element={<RegionesPage />} />
        <Route path="/comunas" element={<ComunasPage />} />
        <Route path="/about" element={<AcercaDePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;