import type { ReactNode } from 'react';
import './Master.css';

interface MasterProps {
    children: ReactNode;
}

export const Master = ({ children }: MasterProps) => {
    return (
        <div className="master-layout">
            <header className="master-header">
                <nav className="master-nav">
                    <div className='nav-brand'>
                        <h2> Gestion de personas </h2>
                    </div>
                    <ul className='nav-links'>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/personas">Personas</a></li>
                        <li><a href="/about">Acerca de</a></li>
                    </ul>
                </nav>
            </header>
            <main className="master-content">
                {children}
            </main>
            <footer className="master-footer">
                <p>&copy; 2025 CRUD con React + JAVA + SQLite. </p>
            </footer>
        </div>
    );
};