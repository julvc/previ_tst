import type { Comuna } from '../../types';

interface ComunasTableProps {
    comunas: Comuna[];
    loading?: boolean;
    emptyMessage?: string;
}

export const ComunasTable = ({
    comunas,
    loading = false,
    emptyMessage = 'No hay comunas para mostrar'
}: ComunasTableProps) => {
    if (loading) {
        return <div className="table-loading">Cargando comunas...</div>;
    }

    if (!comunas) {
        return (
            <div className="error-message">
                <span>⚠️</span>
                <p>Error: No se pudieron cargar las comunas</p>
            </div>
        );
    }

    if (!Array.isArray(comunas)) {
        return (
            <div className="error-message">
                <span>⚠️</span>
                <p>Error: Datos de comunas inválidos (no es un array)</p>
                <pre style={{fontSize: '12px', marginTop: '10px'}}>
                    {JSON.stringify(comunas, null, 2)}
                </pre>
            </div>
        );
    }

    if (comunas.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-icon">🏛️</span>
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="comunas-table-container">
            <div className="table-header">
                <h2>Comunas Disponibles ({comunas.length})</h2>
            </div>

            <div className="table-wrapper">
                <table className="comunas-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Comuna</th>
                            <th>Región</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comunas.map((comuna) => (
                            <tr key={comuna.id} className="comuna-row">
                                <td className="comuna-id">{comuna.id}</td>
                                <td className="comuna-name">{comuna.nombre}</td>
                                <td className="comuna-region">{comuna.region.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};