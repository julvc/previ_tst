import { Link, useLocation } from 'react-router-dom';
import { BackButton } from '../UI/BackButton';

export const Master = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;
    const showBackButton = location.pathname !== '/';
    return (
        <div className="master-layout">
            <header className="master-header">
                <nav className="master-nav">
                    <div className="nav-brand">
                        <h2>🏛️ Gestión de Personas</h2>
                    </div>
                    <ul className="nav-links">
                        <li>
                            <Link
                                to="/"
                                className={isActive('/') ? 'nav-link--active' : ''}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/personas"
                                className={isActive('/personas') ? 'nav-link--active' : ''}
                            >
                                Personas
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/regiones"
                                className={isActive('/regiones') ? 'nav-link--active' : ''}
                            >
                                Regiones
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/comunas"
                                className={isActive('/comunas') ? 'nav-link--active' : ''}
                            >
                                Comunas
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={isActive('/about') ? 'nav-link--active' : ''}
                            >
                                Acerca de
                            </Link>
                        </li>
                    </ul>
                </nav>
                {showBackButton && (
                    <div style={{ padding: '0 2rem 1rem' }}>
                        <BackButton />
                    </div>
                )}
            </header>

            <main className="master-content">
                {children}
            </main>

            <footer className="master-footer">
                <p>© 2025 CRUD con React + JAVA + SQLite.</p>
            </footer>
        </div>
    );
};