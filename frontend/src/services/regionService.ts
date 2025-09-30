import type { Region } from '../types';

interface BackendResponse<T> {
    data: T;
    mensaje?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const regionService = {
    listar: async (): Promise<BackendResponse<Region[]>> => {
        try {
            
            const response = await fetch(`${BASE_URL}/regiones`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as BackendResponse<Region[]>;
            
        } catch (error) {
            console.error('Error en regionService.listar:', error);
            throw new Error(`Error al cargar regiones: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    },

    obtenerPorId: async (id: number): Promise<BackendResponse<Region>> => {
        try {
            const response = await fetch(`${BASE_URL}/regiones/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Región no encontrada');
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data as BackendResponse<Region>;
            
        } catch (error) {
            console.error('Error en regionService.obtenerPorId:', error);
            throw error;
        }
    },
};

export default regionService;