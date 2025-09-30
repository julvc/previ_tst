import type { Comuna } from '../types';

interface BackendResponse<T> {
    data: T;
    mensaje?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const comunaService = {
    listarPorRegion: async (regionId: number): Promise<BackendResponse<Comuna[]>> => {
        try {
            const url = `${BASE_URL}/comunas/region/${regionId}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('No se encontraron comunas para esta región');
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as BackendResponse<Comuna[]>;

        } catch (error) {
            console.error('Error en comunaService.listarPorRegion:', error);
            throw new Error(`Error al cargar comunas: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    },

    obtenerPorId: async (id: number): Promise<BackendResponse<Comuna>> => {
        try {
            const response = await fetch(`${BASE_URL}/comunas/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Comuna no encontrada');
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as BackendResponse<Comuna>;

        } catch (error) {
            console.error('Error en comunaService.obtenerPorId:', error);
            throw error;
        }
    },

    listar: async (): Promise<BackendResponse<Comuna[]>> => {
        try {
            const response = await fetch(`${BASE_URL}/comunas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as BackendResponse<Comuna[]>;

        } catch (error) {
            console.error('Error en comunaService.listar:', error);
            throw error;
        }
    },
};

export default comunaService;