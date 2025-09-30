import { Master } from '../components/Layout/Master';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
    <Master>
        <div className="not-found-page">
            <div className="not-found-content">
                <h1 className="not-found-code">404</h1>
                <h2 className="not-found-title">Página no encontrada</h2>
                <p className="not-found-message">
                    La página que buscas no existe o ha sido movida.
                </p>

                <div className="not-found-actions">
                    <Link to="/" className="btn-primary">
                        Ir al Inicio
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-secondary"
                    >
                        ← Volver Atrás
                    </button>
                </div>
            </div>
        </div>
    </Master>
);