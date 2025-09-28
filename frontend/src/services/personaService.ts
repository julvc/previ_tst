import apiClient from "./apiClient";
import type { Persona, ApiResponse } from "../types";

const personaService = {
    listar: async (): Promise<ApiResponse<Persona[]>> => {
        const response = await apiClient.get<ApiResponse<Persona[]>>("/personas");
        return response.data;
    },
    obtenerPorId: async (id: number): Promise<ApiResponse<Persona>> => {
        const response = await apiClient.get<ApiResponse<Persona>>(`/personas/${id}`);
        return response.data;
    },
    crear: async (persona: Omit<Persona, "id">): Promise<ApiResponse<Persona>> => {
        const response = await apiClient.post<ApiResponse<Persona>>("/personas", persona);
        return response.data;
    },
    actualizar: async (id: number, persona: Omit<Persona, "id">): Promise<ApiResponse<Persona>> => {
        const response = await apiClient.put<ApiResponse<Persona>>(`/personas/${id}`, persona);
        return response.data;
    },
    eliminar: async (id: number): Promise<void> => {
        await apiClient.delete(`/personas/${id}`);
    },
};

export default personaService;
