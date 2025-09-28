import apiClient from "./apiClient";
import type { Comuna } from "../types";

const comunaService = {
    listar: async (): Promise<Comuna[]> => {
        const response = await apiClient.get<Comuna[]>("/comunas");
        return response.data;
    },
    obtenerPorId: async (id: number): Promise<Comuna> => {
        const response = await apiClient.get<Comuna>(`/comunas/${id}`);
        return response.data;
    },
};

export default comunaService;