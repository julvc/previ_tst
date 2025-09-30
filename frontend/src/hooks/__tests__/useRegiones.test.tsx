import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRegiones } from '../useRegion';
import regionService from '../../services/regionService';

vi.mock('../../services/regionService');
const mockRegionService = vi.mocked(regionService);

describe('useRegion Hook', () => {
    const mockRegiones = [
        { id: 1, nombre: 'Región Metropolitana' },
        { id: 2, nombre: 'Región de Valparaíso' }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with loading state', () => {
        mockRegionService.listar.mockReturnValue(new Promise(() => { }));
        const { result } = renderHook(() => useRegiones());

        expect(result.current.loading).toBe(true);
        expect(result.current.regiones).toEqual([]);
        expect(result.current.error).toBeNull();
        expect(result.current.totalRegiones).toBe(0);
        expect(result.current.hayRegiones).toBe(false);
    });

    it('should load regiones successfully', async () => {
        mockRegionService.listar.mockResolvedValue(mockRegiones);
        const { result } = renderHook(() => useRegiones());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.regiones).toEqual(mockRegiones);
        expect(result.current.error).toBeNull();
        expect(result.current.totalRegiones).toBe(2);
        expect(result.current.hayRegiones).toBe(true);
    });

    it('should handle loading error', async () => {
        mockRegionService.listar.mockRejectedValue(new Error('Network error'));
        const { result } = renderHook(() => useRegiones());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.regiones).toEqual([]);
        expect(result.current.error).toBe('Error al cargar las regiones');
        expect(result.current.totalRegiones).toBe(0);
        expect(result.current.hayRegiones).toBe(false);
    });

    it('should search region by id successfully', async () => {
        const targetRegion = mockRegiones[0];
        mockRegionService.listar.mockResolvedValue(mockRegiones);
        mockRegionService.obtenerPorId.mockResolvedValue(targetRegion);

        const { result } = renderHook(() => useRegiones());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        const foundRegion = await result.current.buscarRegionPorId(1);

        expect(foundRegion).toEqual(targetRegion);
        expect(mockRegionService.obtenerPorId).toHaveBeenCalledWith(1);
    });

    it('should handle search error', async () => {
        mockRegionService.listar.mockResolvedValue(mockRegiones);
        mockRegionService.obtenerPorId.mockRejectedValue(new Error('Not found'));

        const { result } = renderHook(() => useRegiones());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        await expect(result.current.buscarRegionPorId(999)).rejects.toThrow('Región no encontrada');
    });
});