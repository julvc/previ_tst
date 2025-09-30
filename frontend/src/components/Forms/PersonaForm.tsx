import { useState, useEffect } from 'react';
import type { Persona } from '../../types';
import { RegionSelector } from './RegionSelector';
import { ComunaSelector } from './ComunaSelector';
import { useRegion } from '../../hooks/useRegion';
import { useComuna } from '../../hooks/useComuna';

interface PersonaFormProps {
    persona?: Persona | null;
    onSubmit: (data: PersonaFormData) => void;
    onCancel: () => void;
}

export interface PersonaFormData {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    direccionCompleta: string;
    comunaId: number;
}

interface FormData {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    calle: string;
    numero: string;
    regionId: number | null;
    comunaId: number | null;
}

export const PersonaForm = ({
    persona,
    onSubmit,
    onCancel
}: PersonaFormProps) => {
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        calle: '',
        numero: '',
        regionId: null,
        comunaId: null
    });

    const { regiones } = useRegion();
    const {
        comunas,
        cargarComunasPorRegion,
        limpiarComunas
    } = useComuna();


    useEffect(() => {
        if (persona) {
            const regionId = persona.direccion.comuna.region.id;
            setFormData({
                nombre: persona.nombre,
                apellido: persona.apellido,
                fechaNacimiento: persona.fechaNacimiento,
                calle: persona.direccion.calle,
                numero: persona.direccion.numero,
                regionId: regionId,
                comunaId: persona.direccion.comuna.id
            });

            cargarComunasPorRegion(regionId);
        }
    }, [persona, cargarComunasPorRegion]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.comunaId) {
            alert('Por favor selecciona una comuna');
            return;
        }

        const direccionCompleta = `${formData.calle.trim()} ${formData.numero.trim()}`.trim();

        if (!direccionCompleta) {
            alert('Por favor ingresa una dirección válida');
            return;
        }

        const personaData: PersonaFormData = {
            nombre: formData.nombre.trim(),
            apellido: formData.apellido.trim(),
            fechaNacimiento: formData.fechaNacimiento,
            direccionCompleta: direccionCompleta,
            comunaId: formData.comunaId
        };

        onSubmit(personaData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegionSelect = (regionId: number | null) => {
        setFormData(prev => ({
            ...prev,
            regionId: regionId,
            comunaId: null
        }));

        if (regionId) {
            cargarComunasPorRegion(regionId);
        } else {
            limpiarComunas();
        }
    };

    const handleComunaSelect = (comunaId: number | null) => {
        setFormData(prev => ({
            ...prev,
            comunaId
        }));
    };

    const direccionPreview = formData.calle && formData.numero
        ? `${formData.calle.trim()} ${formData.numero.trim()}`.trim()
        : '';

    return (
        <div className="persona-form-overlay">
            <div className="persona-form-container">
                <div className="form-header">
                    <h2>{persona ? '✏️ Editar Persona' : '➕ Nueva Persona'}</h2>
                </div>

                <form onSubmit={handleSubmit} className="persona-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre *</label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Ingresa el nombre"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellido">Apellido *</label>
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="Ingresa el apellido"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento *</label>
                        <input
                            id="fechaNacimiento"
                            name="fechaNacimiento"
                            type="date"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-section">
                        <h3>📍 Dirección</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="calle">Calle *</label>
                                <input
                                    id="calle"
                                    name="calle"
                                    type="text"
                                    value={formData.calle}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Ej: Av. Libertador"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="numero">Número *</label>
                                <input
                                    id="numero"
                                    name="numero"
                                    type="text"
                                    value={formData.numero}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="Ej: 123"
                                />
                            </div>
                        </div>

                        {direccionPreview && (
                            <div className="direccion-preview">
                                <strong>Dirección completa:</strong> {direccionPreview}
                            </div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <RegionSelector
                                    regiones={regiones}
                                    selectedRegionId={formData.regionId}
                                    onRegionSelect={handleRegionSelect}
                                    disabled={false}
                                    placeholder="-- Selecciona una región --"
                                />
                            </div>

                            <div className="form-group">
                                <ComunaSelector
                                    comunas={comunas}
                                    selectedComunaId={formData.comunaId}
                                    onComunaSelect={handleComunaSelect}
                                    disabled={comunas.length === 0}
                                    placeholder="-- Selecciona una comuna --"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            {persona ? '✅ Actualizar' : '➕ Crear'} Persona
                        </button>
                        <button type="button" onClick={onCancel} className="btn-secondary">
                            ❌ Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};