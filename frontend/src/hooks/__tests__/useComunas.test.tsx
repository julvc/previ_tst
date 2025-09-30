import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useComunas } from '../useComuna';
import comunaService from '../../services/comunaService';

vi.mock('../../services/comunaService');
const mockComunaService = vi.mocked(comunaService);

describe('useComunas Hook', () => {
    const mockComunas = [
        {
            id: 1,
            nombre: 'Santiago',
            region: { id: 1, nombre: 'Región Metropolitana' }
        },
        {
            id: 2,
            nombre: 'Valparaíso',
            region: { id: 2, nombre: 'Región de Valparaíso' }
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with empty state', () => {
        const { result } = renderHook(() => useComunas());

        expect(result.current.comunas).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.regionSeleccionada).toBeNull();
        expect(result.current.totalComunas).toBe(0);
        expect(result.current.hayComunas).toBe(false);
        expect(result.current.hayRegionSeleccionada).toBe(false);
    });

    it('should load comunas by region successfully', async () => {
        mockComunaService.listarPorRegion.mockResolvedValue(mockComunas);
        const { result } = renderHook(() => useComunas());

        await act(async () => {
            await result.current.cargarComunasPorRegion(1);
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.comunas).toEqual(mockComunas);
        expect(result.current.error).toBeNull();
        expect(result.current.regionSeleccionada).toBe(1);
        expect(result.current.totalComunas).toBe(2);
        expect(result.current.hayComunas).toBe(true);
        expect(result.current.hayRegionSeleccionada).toBe(true);
        expect(result.current.nombreRegionSeleccionada).toBe('Región Metropolitana');
    });

    it('should handle loading error', async () => {
        mockComunaService.listarPorRegion.mockRejectedValue(new Error('Network error'));
        const { result } = renderHook(() => useComunas());

        await act(async () => {
            await result.current.cargarComunasPorRegion(1);
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.comunas).toEqual([]);
        expect(result.current.error).toBe('Error al cargar las comunas');
        expect(result.current.regionSeleccionada).toBe(1);
    });

    it('should handle invalid region id', async () => {
        const { result } = renderHook(() => useComunas());

        await act(async () => {
            await result.current.cargarComunasPorRegion(0);
        });

        expect(result.current.error).toBe('ID de región inválido');
        expect(mockComunaService.listarPorRegion).not.toHaveBeenCalled();
    });

    it('should clear comunas', () => {
        const { result } = renderHook(() => useComunas());

        act(() => {
            result.current.limpiarComunas();
        });

        expect(result.current.comunas).toEqual([]);
        expect(result.current.regionSeleccionada).toBeNull();
        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it('should find comuna by id in loaded comunas', async () => {
        mockComunaService.listarPorRegion.mockResolvedValue(mockComunas);
        const { result } = renderHook(() => useComunas());

        await act(async () => {
            await result.current.cargarComunasPorRegion(1);
        });

        const foundComuna = await result.current.buscarComunaPorId(1);
        expect(foundComuna).toEqual(mockComunas[0]);
    });

    it('should return null when comuna not found', async () => {
        mockComunaService.listarPorRegion.mockResolvedValue(mockComunas);
        const { result } = renderHook(() => useComunas());

        await act(async () => {
            await result.current.cargarComunasPorRegion(1);
        });

        const foundComuna = await result.current.buscarComunaPorId(999);
        expect(foundComuna).toBeNull();
    });
});