import { Master } from '../components/Layout/Master';
import { RegionSelector } from '../components/Forms/RegionSelector';
import { ComunasTable } from '../components/UI/ComunasTable';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { ErrorMessage } from '../components/UI/ErrorMessage';
import { useRegion } from '../hooks/useRegion';
import { useComuna } from '../hooks/useComuna';

export const ComunasPage = () => {
    const { regiones, loading: loadingRegiones, error: errorRegiones } = useRegion();
    const {
        comunas,
        loading: loadingComunas,
        error: errorComunas,
        regionSeleccionada,
        hayRegionSeleccionada,
        cargarComunasPorRegion,
        limpiarComunas
    } = useComuna();

    const handleRegionSelect = (regionId: number | null) => {
        if (regionId) {
            cargarComunasPorRegion(regionId);
        } else {
            limpiarComunas();
        }
    };

    const renderComunasContent = () => {
        if (loadingComunas) {
            return <LoadingSpinner message="Cargando comunas..." />;
        }

        if (errorComunas) {
            return (
                <ErrorMessage
                    message={errorComunas}
                    onRetry={() => regionSeleccionada && cargarComunasPorRegion(regionSeleccionada)}
                    showRetry={true}
                />
            );
        }

        return (
            <ComunasTable
                comunas={comunas}
                loading={false}
                emptyMessage="No hay comunas disponibles para esta región"
            />
        );
    };

    const isLoading = loadingRegiones || loadingComunas;
    const hasError = errorRegiones || errorComunas;
    const errorMessage = errorRegiones || errorComunas || '';

    if (isLoading && !hayRegionSeleccionada) {
        return (
            <Master>
                <LoadingSpinner message="Cargando datos..." />
            </Master>
        );
    }

    if (hasError && !hayRegionSeleccionada) {
        return (
            <Master>
                <ErrorMessage
                    message={errorMessage}
                    onRetry={() => window.location.reload()}
                    showRetry={true}
                />
            </Master>
        );
    }

    return (
        <Master>
            <div className="comunas-page">
                <div className="page-header">
                    <h1>🏛️ Comunas por Región</h1>
                </div>

                <div className="region-selection-section" style={{
                    background: 'var(--surface)',
                    padding: '1.5rem',
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '2rem',
                    boxShadow: 'var(--shadow)'
                }}>
                    <h2 style={{ marginBottom: '1rem' }}>📍 Selecciona una Región</h2>
                    <RegionSelector
                        regiones={regiones}
                        selectedRegionId={regionSeleccionada}
                        onRegionSelect={handleRegionSelect}
                        loading={loadingRegiones}
                        disabled={false}
                        placeholder="-- Selecciona una región para ver sus comunas --"
                    />

                    {loadingRegiones && (
                        <p className="loading-text" style={{
                            marginTop: '1rem',
                            color: 'var(--text-secondary)'
                        }}>
                            ⏳ Cargando regiones...
                        </p>
                    )}
                </div>

                {hayRegionSeleccionada && (
                    <div className="comunas-section">
                        {renderComunasContent()}
                    </div>
                )}

                {!hayRegionSeleccionada && !loadingRegiones && (
                    <div className="info-message" style={{
                        textAlign: 'center',
                        padding: '3rem',
                        background: 'var(--surface)',
                        borderRadius: 'var(--border-radius)',
                        color: 'var(--text-secondary)'
                    }}>
                        <span className="info-icon" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>
                            🏛️
                        </span>
                        <p>Selecciona una región para ver todas sus comunas</p>
                    </div>
                )}
            </div>
        </Master>
    );
};