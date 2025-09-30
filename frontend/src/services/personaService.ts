import type { Persona } from '../types';

export interface PersonaFormData {
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    direccionCompleta: string;
    comunaId: number;
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const personaService = {
    listar: async (): Promise<{ data: Persona[] }> => {
        try {
            const response = await fetch(`${BASE_URL}/personas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en personaService.listar:', error);
            throw error;
        }
    },

    obtenerPorId: async (id: number): Promise<{ data: Persona }> => {
        const response = await fetch(`${BASE_URL}/personas/${id}`);
        if (!response.ok) {
            throw new Error('Persona no encontrada');
        }
        return response.json();
    },

    crear: async (persona: PersonaFormData): Promise<{ data: Persona }> => {
        const personaEntity = {
            nombre: persona.nombre,
            apellido: persona.apellido,
            fechaNacimiento: persona.fechaNacimiento,
            direccion: {
                calle: persona.direccionCompleta,
                comuna: {
                    id: persona.comunaId
                }
            }
        };

        const response = await fetch(`${BASE_URL}/personas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personaEntity),
        });

        const responseText = await response.text();
        let responseData;
        
        try {
            responseData = JSON.parse(responseText);
        } catch {
            throw new Error(`Response no es JSON válido: ${responseText.substring(0, 500)}`);
        }

        if (!response.ok) {
            const errorMessage = responseData.mensaje || responseData.message || `HTTP ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        
        return responseData;
    },

    actualizar: async (id: number, persona: PersonaFormData): Promise<{ data: Persona }> => {
        const personaEntity = {
            id: id,
            nombre: persona.nombre,
            apellido: persona.apellido,
            fechaNacimiento: persona.fechaNacimiento,
            direccion: {
                calle: persona.direccionCompleta,
                comuna: {
                    id: persona.comunaId
                }
            }
        };

        const response = await fetch(`${BASE_URL}/personas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personaEntity),
        });

        const responseText = await response.text();

        if (!response.ok) {
            let errorData;
            try {
                errorData = JSON.parse(responseText);
            } catch {
                errorData = { mensaje: 'Error al actualizar persona' };
            }
            throw new Error(errorData.mensaje || errorData.message || 'Error al actualizar persona');
        }

        return JSON.parse(responseText);
    },

    eliminar: async (id: number): Promise<void> => {
        const response = await fetch(`${BASE_URL}/personas/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const responseText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(responseText);
            } catch {
                errorData = { mensaje: 'Error al eliminar persona' };
            }
            throw new Error(errorData.mensaje || 'Error al eliminar persona');
        }
    },
};

export default personaService;