import type { Persona } from '../../types';

interface PersonasTableProps {
    personas: Persona[];
    loading?: boolean;
    onEdit: (persona: Persona) => void;
    onDelete: (id: number) => void;
    emptyMessage?: string;
}

export const PersonasTable = ({
    personas,
    loading = false,
    onEdit,
    onDelete,
    emptyMessage = 'No hay personas para mostrar'
}: PersonasTableProps) => {
    if (loading) {
        return <div className="table-loading">Cargando personas...</div>;
    }

    if (personas.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-icon">👥</span>
                <p>{emptyMessage}</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL');
    };

    const formatAddress = (direccion: Persona['direccion']) => {
        return `${direccion.calle} ${direccion.numero}`;
    };

    return (
        <div className="personas-table-container">
            <div className="table-header">
                <h2>Personas Registradas ({personas.length})</h2>
            </div>

            <div className="table-wrapper">
                <table className="personas-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha Nacimiento</th>
                            <th>Dirección</th>
                            <th>Comuna</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((persona) => (
                            <tr key={persona.id} className="persona-row">
                                <td className="persona-id">{persona.id}</td>
                                <td className="persona-nombre">{persona.nombre}</td>
                                <td className="persona-apellido">{persona.apellido}</td>
                                <td className="persona-fecha">{formatDate(persona.fechaNacimiento)}</td>
                                <td className="persona-direccion">
                                    {formatAddress(persona.direccion)}
                                </td>
                                <td className="persona-comuna">{persona.direccion.comuna.nombre}</td>
                                <td className="persona-actions">
                                    <button
                                        onClick={() => onEdit(persona)}
                                        className="btn-secondary btn-sm"
                                        title="Editar persona"
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(persona.id)}
                                        className="btn-danger btn-sm"
                                        title="Eliminar persona"
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};