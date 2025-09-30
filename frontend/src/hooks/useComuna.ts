import { useState, useCallback } from 'react';
import comunaService from '../services/comunaService';
import type { Comuna } from '../types';

export const useComuna = () => {
    const [comunas, setComunas] = useState<Comuna[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [regionSeleccionada, setRegionSeleccionada] = useState<number | null>(null);

    const cargarComunasPorRegion = useCallback(async (regionId: number) => {
        try {
            setLoading(true);
            setError(null);
            setRegionSeleccionada(regionId);

            const response = await comunaService.listarPorRegion(regionId);
            let comunasData: Comuna[];
            if (Array.isArray(response)) {
                comunasData = response;
            } else if (response && typeof response === 'object' && 'data' in response) {
                comunasData = response.data || [];
            } else {
                console.warn('⚠️ Response inesperada:', response);
                comunasData = [];
            }

            setComunas(Array.isArray(comunasData) ? comunasData : []);

        } catch (err) {
            console.error('Error cargando comunas:', err);
            setError(`Error al cargar comunas: ${err instanceof Error ? err.message : 'Error desconocido'}`);
            setComunas([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const limpiarComunas = useCallback(() => {
        setComunas([]);
        setRegionSeleccionada(null);
        setError(null);
    }, []);

    const buscarComunaPorId = useCallback(async (id: number): Promise<Comuna | null> => {
        try {
            const response = await comunaService.obtenerPorId(id);

            let comuna: Comuna;
            if (response && typeof response === 'object' && 'data' in response) {
                comuna = response.data;
            } else {
                comuna = response as Comuna;
            }

            return comuna;
        } catch (err) {
            console.error('Error buscando comuna:', err);
            return null;
        }
    }, []);

    const totalComunas = comunas.length;
    const hayComunas = totalComunas > 0;
    const hayRegionSeleccionada = regionSeleccionada !== null;

    return {
        comunas,
        loading,
        error,
        regionSeleccionada,
        totalComunas,
        hayComunas,
        hayRegionSeleccionada,
        cargarComunasPorRegion,
        limpiarComunas,
        buscarComunaPorId,
    };
};