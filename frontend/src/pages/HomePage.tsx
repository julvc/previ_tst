import { Master } from '../components/Layout/Master';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <Master>
            <div className="home-page">
                <h1>🏠 Bienvenido al Sistema de Gestión</h1>

                <div className="home-cards">
                    <div className="home-card">
                        <h3>👥 Gestión de Personas</h3>
                        <p>Crear, editar y eliminar personas del sistema. Gestiona información completa incluyendo direcciones y comunas.</p>
                        <Link to="/personas" className="btn-primary">
                            Ir a Personas
                        </Link>
                    </div>

                    <div className="home-card">
                        <h3>🌍 Regiones de Chile</h3>
                        <p>Explora todas las regiones de Chile. Busca regiones específicas por ID y consulta información detallada.</p>
                        <Link to="/regiones" className="btn-primary">
                            Ver Regiones
                        </Link>
                    </div>

                    <div className="home-card">
                        <h3>🏛️ Comunas por Región</h3>
                        <p>Navega por las comunas organizadas por región. Selecciona una región para ver todas sus comunas.</p>
                        <Link to="/comunas" className="btn-primary">
                            Ver Comunas
                        </Link>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--border-radius)' }}>
                    <h2>🛠️ Tecnologías Utilizadas</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                        Frontend: React + TypeScript + Vite | Backend: Java Spring Boot + SQLite
                    </p>
                </div>
            </div>
        </Master>
    );
};