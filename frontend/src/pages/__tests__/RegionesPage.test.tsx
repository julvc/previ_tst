import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegionesPage } from '../RegionesPage';
import { useRegion } from '../../hooks/useRegion';
import { useSearch } from '../../hooks/useSearch';

vi.mock('../../hooks/useRegiones');
vi.mock('../../hooks/useSearch');

const mockUseRegiones = vi.mocked(useRegion);
const mockUseSearch = vi.mocked(useSearch);

describe('RegionesPage', () => {
    const mockRegiones = [
        { id: 1, nombre: 'Región Metropolitana' },
        { id: 2, nombre: 'Región de Valparaíso' }
    ];

    const mockBuscarRegionPorId = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        mockUseRegiones.mockReturnValue({
            regiones: mockRegiones,
            loading: false,
            error: null,
            cargarRegiones: vi.fn(),
            buscarRegionPorId: mockBuscarRegionPorId,
            recargar: vi.fn(),
            totalRegiones: 2,
            hayRegiones: true
        });

        mockUseSearch.mockReturnValue({
            searchTerm: '',
            setSearchTerm: vi.fn(),
            searchResult: null,
            searching: false,
            searchError: null,
            ejecutarBusqueda: vi.fn(),
            limpiarBusqueda: vi.fn(),
            hayResultado: false,
            puedeEjecutar: false,
            tieneError: false
        });
    });

    it('renders page title and regions table', () => {
        render(<RegionesPage />);

        expect(screen.getByText('🌍 Regiones de Chile')).toBeInTheDocument();
        expect(screen.getByText('Región Metropolitana')).toBeInTheDocument();
        expect(screen.getByText('Región de Valparaíso')).toBeInTheDocument();
    });

    it('renders loading state', () => {
        mockUseRegiones.mockReturnValue({
            ...mockUseRegiones(),
            loading: true
        });

        render(<RegionesPage />);

        expect(screen.getByText('Cargando regiones...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        mockUseRegiones.mockReturnValue({
            ...mockUseRegiones(),
            loading: false,
            error: 'Error de prueba'
        });

        render(<RegionesPage />);

        expect(screen.getByText('Error de prueba')).toBeInTheDocument();
    });

    it('handles search functionality', async () => {
        const mockEjecutarBusqueda = vi.fn();
        const mockSetSearchTerm = vi.fn();

        mockUseSearch.mockReturnValue({
            ...mockUseSearch(),
            searchTerm: '1',
            setSearchTerm: mockSetSearchTerm,
            searchResult: null,
            searching: false,
            searchError: null,
            ejecutarBusqueda: mockEjecutarBusqueda,
            limpiarBusqueda: vi.fn(),
            hayResultado: false,
            puedeEjecutar: true,
            tieneError: false
        });

        render(<RegionesPage />);

        const searchButton = screen.getByText('Buscar');
        expect(searchButton).not.toBeDisabled();

        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(mockEjecutarBusqueda).toHaveBeenCalled();
        });
    });

    it('updates search term when typing', () => {
        const mockSetSearchTerm = vi.fn();

        mockUseSearch.mockReturnValue({
            searchTerm: '',
            setSearchTerm: mockSetSearchTerm,
            searchResult: null,
            searching: false,
            searchError: null,
            ejecutarBusqueda: vi.fn(),
            limpiarBusqueda: vi.fn(),
            hayResultado: false,
            puedeEjecutar: false,
            tieneError: false
        });

        render(<RegionesPage />);

        const searchInput = screen.getByPlaceholderText('Ingresa ID de la región');

        fireEvent.change(searchInput, { target: { value: '1' } });

        expect(mockSetSearchTerm).toHaveBeenCalledWith('1');
    });

    it('displays search result when found', () => {
        const mockRegion = { id: 1, nombre: 'Región Metropolitana' };

        mockUseSearch.mockReturnValue({
            searchTerm: '1',
            setSearchTerm: vi.fn(),
            searchResult: mockRegion,
            searching: false,
            searchError: null,
            ejecutarBusqueda: vi.fn(),
            limpiarBusqueda: vi.fn(),
            hayResultado: true,
            puedeEjecutar: false,
            tieneError: false
        });

        render(<RegionesPage />);

        expect(screen.getByText('Región Encontrada:')).toBeInTheDocument();
        expect(screen.getByText(/ID:/)).toBeInTheDocument();
        expect(screen.getByText(/Nombre:/)).toBeInTheDocument();

        expect(screen.getByText('Región Encontrada:').closest('.search-result-card')).toBeInTheDocument();

        expect(screen.getAllByText('Región Metropolitana')).toHaveLength(2);

        const searchResult = screen.getByText('Región Encontrada:').parentElement;
        expect(searchResult).toHaveClass('search-result-card');
    });

    it('displays search error when search fails', () => {
        mockUseSearch.mockReturnValue({
            searchTerm: '999',
            setSearchTerm: vi.fn(),
            searchResult: null,
            searching: false,
            searchError: 'Región no encontrada',
            ejecutarBusqueda: vi.fn(),
            limpiarBusqueda: vi.fn(),
            hayResultado: false,
            puedeEjecutar: true,
            tieneError: true
        });

        render(<RegionesPage />);

        expect(screen.getByText('Región no encontrada')).toBeInTheDocument();
        expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('handles clear search', () => {
        const mockLimpiarBusqueda = vi.fn();

        mockUseSearch.mockReturnValue({
            searchTerm: 'algo',
            setSearchTerm: vi.fn(),
            searchResult: null,
            searching: false,
            searchError: null,
            ejecutarBusqueda: vi.fn(),
            limpiarBusqueda: mockLimpiarBusqueda,
            hayResultado: false,
            puedeEjecutar: true,
            tieneError: false
        });

        render(<RegionesPage />);

        const clearButton = screen.getByText('Limpiar');
        fireEvent.click(clearButton);

        expect(mockLimpiarBusqueda).toHaveBeenCalled();
    });
});