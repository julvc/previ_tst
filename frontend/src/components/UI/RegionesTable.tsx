import type { Region } from '../../types';

interface RegionesTableProps {
    regiones: Region[];
    loading?: boolean;
    emptyMessage?: string;
}

export const RegionesTable = ({
    regiones,
    loading = false,
    emptyMessage = 'No hay regiones para mostrar'
}: RegionesTableProps) => {
    if (loading) {
        return <div className="table-loading">Cargando datos...</div>;
    }

    if (regiones.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="regiones-table-container">
            <div className="table-header">
                <h2>Regiones Disponibles ({regiones.length})</h2>
            </div>

            <div className="table-wrapper">
                <table className="regiones-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Región</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regiones.map((region) => (
                            <tr key={region.id} className="region-row">
                                <td className="region-id">{region.id}</td>
                                <td className="region-name">{region.nombre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};