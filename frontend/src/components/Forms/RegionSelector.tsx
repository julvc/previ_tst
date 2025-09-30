import type { Region } from '../../types';

interface RegionSelectorProps {
    regiones: Region[];
    selectedRegionId: number | null;
    onRegionSelect: (regionId: number | null) => void;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export const RegionSelector = ({
    regiones,
    selectedRegionId,
    onRegionSelect,
    loading = false,
    disabled = false,
    placeholder = '-- Selecciona una región --'
}: RegionSelectorProps) => {


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const regionId = value ? parseInt(value, 10) : null;
        onRegionSelect(regionId);
    };

    return (
        <div className="region-selector-container">
            <label htmlFor="region-select" className="region-selector-label">
                Región *
            </label>

            <select
                id="region-select"
                value={selectedRegionId ?? ''} 
                onChange={handleChange}
                disabled={loading || disabled || regiones.length === 0}
                className={`region-selector ${disabled ? 'region-selector--disabled' : ''}`}
                required
            >
                <option value="">{placeholder}</option>
                {regiones.map((region) => (
                    <option key={region.id} value={region.id}>
                        {region.nombre}
                    </option>
                ))}
            </select>

            {loading && <span className="loading-indicator">⏳ Cargando...</span>}
            {regiones.length === 0 && !loading && (
                <span className="no-options">No hay regiones disponibles</span>
            )}

            <div style={{
                fontSize: '10px',
                color: '#666',
                marginTop: '2px'
            }}>
            </div>
        </div>
    );
};