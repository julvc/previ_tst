import { Master } from '../components/Layout/Master';
import { SearchForm } from '../components/Forms/SearchForm';
import { PersonasTable } from '../components/UI/PersonasTable';
import { PersonaForm, type PersonaFormData } from '../components/Forms/PersonaForm';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ErrorMessage } from '../components/UI/ErrorMessage';
import { usePersonas } from '../hooks/usePersonas';
import { useSearch } from '../hooks/useSearch';
import { useState } from 'react';
import type { Persona } from '../types';
import ConfirmModal from '../components/UI/ConfirmModal';
import NotificationModal from '../components/UI/NotificacionModal';

export const PersonasPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingPersona, setEditingPersona] = useState<Persona | null>(null);

    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info' as 'danger' | 'success' | 'info',
        onConfirm: () => { }
    });

    const [notification, setNotification] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info' as 'success' | 'error' | 'warning' | 'info'
    });

    const {
        personas,
        loading,
        error,
        crearPersona,
        actualizarPersona,
        eliminarPersona,
        buscarPersonaPorId
    } = usePersonas();

    const {
        searchTerm,
        setSearchTerm,
        searchResult,
        searching,
        searchError,
        ejecutarBusqueda,
        limpiarBusqueda
    } = useSearch<Persona>();

    const showNotification = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
        setNotification({
            isOpen: true,
            title,
            message,
            type
        });
    };

    const handleSearch = () => {
        ejecutarBusqueda(async (term: string) => {
            const id = Number(term);
            if (Number.isNaN(id)) {
                throw new Error('ID inválido');
            }
            const res = await buscarPersonaPorId(id);
            if (!res) {
                throw new Error('Persona no encontrada');
            }
            return res;
        });
    };

    const handleCreate = () => {
        setEditingPersona(null);
        setShowForm(true);
    };

    const handleEdit = (persona: Persona) => {
        setEditingPersona(persona);
        setShowForm(true);
    };

    const handleDeleteClick = (id: number) => {
        const persona = personas.find(p => p.id === id);
        if (!persona) return;

        setConfirmModal({
            isOpen: true,
            title: 'Eliminar Persona',
            message: `¿Estás seguro de que deseas eliminar a ${persona.nombre} ${persona.apellido}? Esta acción no se puede deshacer.`,
            type: 'danger',
            onConfirm: () => confirmDelete(id)
        });
    };

    const confirmDelete = (id: number) => {
        eliminarPersona(id)
            .then(() => {
                setConfirmModal({ ...confirmModal, isOpen: false });
                showNotification('Éxito', 'Persona eliminada correctamente', 'success');
            })
            .catch((err) => {
                setConfirmModal({ ...confirmModal, isOpen: false });
                console.error('Error eliminando persona:', err);
                showNotification('Error', 'No se pudo eliminar la persona', 'error');
            });
    };

    const handleFormSubmit = async (personaData: PersonaFormData) => {
        try {
            if (editingPersona) {
                await actualizarPersona(editingPersona.id, personaData);
                showNotification('Éxito', 'Persona actualizada correctamente', 'success');
            } else {
                await crearPersona(personaData);
                showNotification('Éxito', 'Persona creada correctamente', 'success');
            }
            setShowForm(false);
            setEditingPersona(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            console.error('Error al guardar persona:', err);
            showNotification('Error', `Error al guardar: ${errorMessage}`, 'error');
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingPersona(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL');
    };

    const formatAddress = (direccion: Persona['direccion']) => {
        return `${direccion.calle}, ${direccion.comuna.nombre}`;
    };

    if (loading) {
        return (
            <Master>
                <LoadingSpinner message="Cargando personas..." />
            </Master>
        );
    }

    if (error) {
        return (
            <Master>
                <ErrorMessage
                    message={error}
                    onRetry={() => window.location.reload()}
                    showRetry={true}
                />
            </Master>
        );
    }

    return (
        <>
            <Master>
                <div className="personas-page">
                    <div className="page-header">
                        <h1>👥 Gestión de Personas</h1>
                        <button onClick={handleCreate} className="btn-primary">
                            ➕ Nueva Persona
                        </button>
                    </div>

                    <SearchForm
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                        onSearch={handleSearch}
                        onClear={limpiarBusqueda}
                        placeholder="Ingresa ID de la persona"
                        searching={searching}
                        searchResult={searchResult && (
                            <div className="search-result-card">
                                <h3>Persona Encontrada:</h3>
                                <div className="result-details">
                                    <p><strong>Nombre:</strong> {searchResult.nombre} {searchResult.apellido}</p>
                                    <p><strong>Fecha de Nacimiento:</strong> {formatDate(searchResult.fechaNacimiento)}</p>
                                    <p><strong>Dirección:</strong> {formatAddress(searchResult.direccion)}</p>
                                    <p><strong>Comuna:</strong> {searchResult.direccion.comuna.nombre}</p>
                                    <p><strong>Región:</strong> {searchResult.direccion.comuna.region.nombre}</p>
                                </div>
                            </div>
                        )}
                        error={searchError}
                        label="Buscar Persona por ID"
                        inputType="number"
                    />

                    {showForm && (
                        <PersonaForm
                            persona={editingPersona}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    )}

                    <PersonasTable
                        personas={personas}
                        loading={false}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        emptyMessage="No hay personas registradas"
                    />
                </div>
            </Master>

            {/* Modales fuera del Master */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
            />

            <NotificationModal
                isOpen={notification.isOpen}
                title={notification.title}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ ...notification, isOpen: false })}
            />
        </>
    );
};