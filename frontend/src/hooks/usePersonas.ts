import { useState, useEffect, useCallback } from 'react';
import personaService from '../services/personaService';
import type { Persona } from '../types';

export interface PersonaFormData {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    direccionCompleta: string;  
    comunaId: number;           
}

export const usePersonas = () => {
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cargarPersonas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await personaService.listar();
            const data = Array.isArray(response) ? response : response.data;
            setPersonas(data);
        } catch (err) {
            console.error('Error cargando personas:', err);
            setError('Error al cargar las personas');
        } finally {
            setLoading(false);
        }
    }, []);

    const crearPersona = useCallback(async (persona: PersonaFormData) => {
        try {
            const response = await personaService.crear(persona);
            const nuevaPersona = 'data' in response ? response.data : response;
            setPersonas(prev => [...prev, nuevaPersona]);
            return nuevaPersona;
        } catch (err) {
            console.error('Error creando persona:', err);
            throw new Error('Error al crear la persona');
        }
    }, []);

    const actualizarPersona = useCallback(async (id: number, persona: PersonaFormData) => {  
        try {
            const response = await personaService.actualizar(id, persona);
            const personaActualizada = 'data' in response ? response.data : response;
            setPersonas(prev =>
                prev.map(p => p.id === id ? personaActualizada : p)
            );
            return personaActualizada;
        } catch (err) {
            console.error('Error actualizando persona:', err);
            throw new Error('Error al actualizar la persona');
        }
    }, []);

    const eliminarPersona = useCallback(async (id: number) => {
        try {
            await personaService.eliminar(id);
            setPersonas(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error eliminando persona:', err);
            throw new Error('Error al eliminar la persona');
        }
    }, []);

    const buscarPersonaPorId = useCallback(async (id: number): Promise<Persona | null> => {
        try {
            const response = await personaService.obtenerPorId(id);
            return 'data' in response ? response.data : response;
        } catch (err) {
            console.error('Error buscando persona:', err);
            return null;
        }
    }, []);

    useEffect(() => {
        cargarPersonas();
    }, [cargarPersonas]);

    const totalPersonas = personas.length;
    const hayPersonas = totalPersonas > 0;

    return {
        personas,
        loading,
        error,
        totalPersonas,
        hayPersonas,
        crearPersona,
        actualizarPersona,
        eliminarPersona,
        buscarPersonaPorId,
        recargar: cargarPersonas,
    };
};