import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../useSearch';

describe('useSearch Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with empty state', () => {
        const { result } = renderHook(() => useSearch<string>());

        expect(result.current.searchTerm).toBe('');
        expect(result.current.searchResult).toBeNull();
        expect(result.current.searching).toBe(false);
        expect(result.current.searchError).toBeNull();
        expect(result.current.hayResultado).toBe(false);
        expect(result.current.puedeEjecutar).toBe(false);
        expect(result.current.tieneError).toBe(false);
    });

    it('should update search term', () => {
        const { result } = renderHook(() => useSearch<string>());

        act(() => {
            result.current.setSearchTerm('test');
        });

        expect(result.current.searchTerm).toBe('test');
        expect(result.current.puedeEjecutar).toBe(true);
    });

    it('should execute search successfully', async () => {
        const mockSearchFn = vi.fn().mockResolvedValue('resultado');
        const { result } = renderHook(() => useSearch<string>());

        act(() => {
            result.current.setSearchTerm('test');
        });

        await act(async () => {
            await result.current.ejecutarBusqueda(mockSearchFn);
        });

        expect(mockSearchFn).toHaveBeenCalledWith('test');
        expect(result.current.searchResult).toBe('resultado');
        expect(result.current.searching).toBe(false);
        expect(result.current.searchError).toBeNull();
        expect(result.current.hayResultado).toBe(true);
    });

    it('should handle search error', async () => {
        const mockSearchFn = vi.fn().mockRejectedValue(new Error('Test error'));
        const { result } = renderHook(() => useSearch<string>());

        act(() => {
            result.current.setSearchTerm('test');
        });

        await act(async () => {
            await result.current.ejecutarBusqueda(mockSearchFn);
        });

        expect(result.current.searchResult).toBeNull();
        expect(result.current.searchError).toBe('Test error');
        expect(result.current.tieneError).toBe(true);
        expect(result.current.hayResultado).toBe(false);
    });

    it('should not execute search with empty term', async () => {
        const mockSearchFn = vi.fn();
        const { result } = renderHook(() => useSearch<string>());

        await act(async () => {
            await result.current.ejecutarBusqueda(mockSearchFn);
        });

        expect(mockSearchFn).not.toHaveBeenCalled();
        expect(result.current.searchError).toBe('Término de búsqueda requerido');
    });

    it('should clear search', () => {
        const { result } = renderHook(() => useSearch<string>());

        act(() => {
            result.current.setSearchTerm('test');
        });

        act(() => {
            result.current.limpiarBusqueda();
        });

        expect(result.current.searchTerm).toBe('');
        expect(result.current.searchResult).toBeNull();
        expect(result.current.searchError).toBeNull();
        expect(result.current.searching).toBe(false);
    });
});