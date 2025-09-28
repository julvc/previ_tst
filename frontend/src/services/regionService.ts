import apiClient from "./apiClient";
import type { Region } from "../types";

const regionService = {
    listar: async (): Promise<Region[]> => {
        const response = await apiClient.get<Region[]>("/regiones");
        return response.data;
    },
    obtenerPorId: async (id: number): Promise<Region> => {
        const response = await apiClient.get<Region>(`/regiones/${id}`);
        return response.data;
    },
};

export default regionService;
