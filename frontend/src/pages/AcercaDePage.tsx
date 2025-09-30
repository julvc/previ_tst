import { Master } from '../components/Layout/Master';

export const AcercaDePage = () => (
    <Master>
        <div className="about-page">
            <h1>Acerca del Proyecto</h1>

            <div className="about-content">
                <section>
                    <h2>Objetivo</h2>
                    <p>
                        Sistema CRUD para gestión de personas con React, Java y SQLite.
                        Implementa arquitectura limpia y patrones de diseño modernos.
                    </p>
                </section>

                <section>
                    <h2>Tecnologías</h2>
                    <div className="tech-grid">
                        <div className="tech-item">
                            <h4>Frontend</h4>
                            <ul>
                                <li>React 18 + TypeScript</li>
                                <li>Vite + Vitest</li>
                                <li>Custom Hooks</li>
                                <li>React Router</li>
                            </ul>
                        </div>

                        <div className="tech-item">
                            <h4>Backend</h4>
                            <ul>
                                <li>Java Spring Boot</li>
                                <li>SQLite Database</li>
                                <li>REST API</li>
                                <li>JPA/Hibernate</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Arquitectura</h2>
                    <ul>
                        <li><strong>SOLID Principles</strong> - Código mantenible</li>
                        <li><strong>Custom Hooks</strong> - Lógica reutilizable</li>
                        <li><strong>Component Composition</strong> - UI modular</li>
                        <li><strong>Service Layer</strong> - Abstracción de datos</li>
                    </ul>
                </section>
            </div>
        </div>
    </Master>
);