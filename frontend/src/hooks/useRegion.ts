import { useState, useEffect, useCallback } from 'react';
import regionService from '../services/regionService';
import type { Region } from '../types';

export const useRegion = () => {
    const [regiones, setRegiones] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cargarRegiones = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await regionService.listar();

            let regionesData: Region[];

            if (Array.isArray(response)) {
                regionesData = response;
            } else if (response && typeof response === 'object') {
                if ('data' in response) {
                    regionesData = response.data || [];
                } else {
                    regionesData = [];
                }
            } else {
                console.error('Response inesperada:', response);
                regionesData = [];
            }

            if (!Array.isArray(regionesData)) {
                console.error('regionesData NO es array, forzando array vacío');
                regionesData = [];
            }

            setRegiones(regionesData);

        } catch (err) {
            console.error('Error cargando regiones:', err);
            setError(`Error al cargar las regiones: ${err instanceof Error ? err.message : 'Error desconocido'}`);
            setRegiones([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarRegionPorId = useCallback(async (id: number): Promise<Region | null> => {
        try {
            const response = await regionService.obtenerPorId(id);

            let region: Region;
            if (response && typeof response === 'object' && 'data' in response) {
                region = response.data;
            } else {
                region = response as Region;
            }

            return region;
        } catch (err) {
            console.error('Error buscando región:', err);
            return null;
        }
    }, []);

    useEffect(() => {
        cargarRegiones();
    }, [cargarRegiones]);

    return {
        regiones,
        loading,
        error,
        totalRegiones: regiones.length,
        hayRegiones: regiones.length > 0,
        cargarRegiones,
        buscarRegionPorId,
        recargar: cargarRegiones,
    };
};