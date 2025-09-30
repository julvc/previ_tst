import { Master } from '../components/Layout/Master';
import { SearchForm } from '../components/Forms/SearchForm';
import { RegionesTable } from '../components/UI/RegionesTable';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ErrorMessage } from '../components/UI/ErrorMessage';
import { useRegion } from '../hooks/useRegion';
import { useSearch } from '../hooks/useSearch';
import type { Region } from '../types';

export const RegionesPage = () => {
    const { regiones, loading, error, buscarRegionPorId } = useRegion();
    const {
        searchTerm,
        setSearchTerm,
        searchResult,
        searching,
        searchError,
        ejecutarBusqueda,
        limpiarBusqueda
    } = useSearch<Region>();

    const handleSearch = () => {
        ejecutarBusqueda(async (term: string) => {
            const id = Number(term);
            if (Number.isNaN(id)) {
                throw new Error('ID inválido');
            }
            const res = await buscarRegionPorId(id);
            if (!res) {
                throw new Error('Región no encontrada');
            }
            return res;
        });
    };

    const handleClearSearch = () => {
        limpiarBusqueda();
    };

    if (loading) {
        return (
            <Master>
                <LoadingSpinner message="Cargando regiones..." />
            </Master>
        );
    }

    if (error) {
        return (
            <Master>
                <ErrorMessage
                    message={error}
                    onRetry={() => window.location.reload()}
                    showRetry={true}
                />
            </Master>
        );
    }

    const searchResultComponent = searchResult && (
        <div className="search-result-card">
            <h3>Región Encontrada:</h3>
            <div className="result-details">
                <p><strong>ID:</strong> {searchResult.id}</p>
                <p><strong>Nombre:</strong> {searchResult.nombre}</p>
            </div>
        </div>
    );

    return (
        <Master>
            <div className="regiones-page">
                <h1>🌍 Regiones de Chile</h1>

                <SearchForm
                    searchTerm={searchTerm}
                    onSearchTermChange={setSearchTerm}
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                    placeholder="Ingresa ID de la región"
                    searching={searching}
                    searchResult={searchResultComponent}
                    error={searchError}
                    label="Buscar Región por ID"
                    inputType="number"
                />

                <RegionesTable
                    regiones={regiones}
                    loading={false}
                    emptyMessage="No hay regiones disponibles"
                />
            </div>
        </Master>
    );
};