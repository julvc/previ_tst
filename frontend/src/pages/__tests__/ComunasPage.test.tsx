import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ComunasPage } from '../ComunasPage';
import { useRegiones } from '../../hooks/useRegion';
import { useComunas } from '../../hooks/useComuna';

// 🎭 Mocks de hooks
vi.mock('../../hooks/useRegiones');
vi.mock('../../hooks/useComunas');

const mockUseRegiones = vi.mocked(useRegiones);
const mockUseComunas = vi.mocked(useComunas);

describe('ComunasPage', () => {
    const mockRegiones = [
        { id: 1, nombre: 'Región Metropolitana' },
        { id: 2, nombre: 'Región de Valparaíso' }
    ];

    const mockComunas = [
        {
            id: 1,
            nombre: 'Santiago',
            region: { id: 1, nombre: 'Región Metropolitana' }
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup default mocks
        mockUseRegiones.mockReturnValue({
            regiones: mockRegiones,
            loading: false,
            error: null,
            cargarRegiones: vi.fn(),
            buscarRegionPorId: vi.fn(),
            totalRegiones: 2,
            hayRegiones: true
        });

        mockUseComunas.mockReturnValue({
            comunas: [],
            loading: false,
            error: null,
            regionSeleccionada: null,
            totalComunas: 0,
            hayComunas: false,
            hayRegionSeleccionada: false,
            nombreRegionSeleccionada: null,
            cargarComunasPorRegion: vi.fn(),
            limpiarComunas: vi.fn(),
            buscarComunaPorId: vi.fn()
        });
    });

    it('renders page title and region selector', () => {
        render(<ComunasPage />);

        expect(screen.getByText('🏛️ Comunas por Región')).toBeInTheDocument();
        expect(screen.getByText('Selecciona una Región')).toBeInTheDocument();
        expect(screen.getByText('-- Selecciona una región --')).toBeInTheDocument();
    });

    it('shows info message when no region selected', () => {
        render(<ComunasPage />);

        expect(screen.getByText('Selecciona una región para ver sus comunas')).toBeInTheDocument();
    });

    it('loads comunas when region is selected', async () => {
        const mockCargarComunas = vi.fn();

        mockUseComunas.mockReturnValue({
            ...mockUseComunas(),
            comunas: mockComunas,
            regionSeleccionada: 1,
            hayRegionSeleccionada: true,
            nombreRegionSeleccionada: 'Región Metropolitana',
            cargarComunasPorRegion: mockCargarComunas
        });

        render(<ComunasPage />);

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: '1' } });

        await waitFor(() => {
            expect(mockCargarComunas).toHaveBeenCalledWith(1);
        });
    });

    it('displays comunas table when region is selected', () => {
        mockUseComunas.mockReturnValue({
            ...mockUseComunas(),
            comunas: mockComunas,
            regionSeleccionada: 1,
            hayRegionSeleccionada: true,
            nombreRegionSeleccionada: 'Región Metropolitana'
        });

        render(<ComunasPage />);

        expect(screen.getByText('Comunas de Región Metropolitana (1)')).toBeInTheDocument();
        expect(screen.getByText('Santiago')).toBeInTheDocument();
    });

    it('shows loading state when loading comunas', () => {
        mockUseComunas.mockReturnValue({
            ...mockUseComunas(),
            loading: true,
            regionSeleccionada: 1,
            hayRegionSeleccionada: true
        });

        render(<ComunasPage />);

        expect(screen.getByText('Cargando comunas...')).toBeInTheDocument();
    });

    it('shows error state for comunas', () => {
        mockUseComunas.mockReturnValue({
            ...mockUseComunas(),
            error: 'Error al cargar comunas',
            regionSeleccionada: 1,
            hayRegionSeleccionada: true
        });

        render(<ComunasPage />);

        expect(screen.getByText('Error al cargar comunas')).toBeInTheDocument();
    });
});