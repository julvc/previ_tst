import { useState, useCallback } from 'react';

export const useSearch = <T>() => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<T | null>(null);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const ejecutarBusqueda = useCallback(async (
        searchFn: (term: string) => Promise<T>
    ) => {
        if (!searchTerm.trim()) {
            setSearchError('Término de búsqueda requerido');
            return;
        }

        try {
            setSearching(true);
            setSearchError(null);

            const resultado = await searchFn(searchTerm.trim());
            setSearchResult(resultado);
        } catch (err) {
            console.error('Error en búsqueda:', err);
            setSearchResult(null);
            setSearchError(
                err instanceof Error
                    ? err.message
                    : 'Error en la búsqueda'
            );
        } finally {
            setSearching(false);
        }
    }, [searchTerm]);

    const limpiarBusqueda = useCallback(() => {
        setSearchTerm('');
        setSearchResult(null);
        setSearchError(null);
        setSearching(false);
    }, []);

    const hayResultado = searchResult !== null;
    const puedeEjecutar = searchTerm.trim().length > 0 && !searching;
    const tieneError = searchError !== null;

    return {
        searchTerm,
        searchResult,
        searching,
        searchError,
        hayResultado,
        puedeEjecutar,
        tieneError,
        setSearchTerm,
        ejecutarBusqueda,
        limpiarBusqueda,
    };
};