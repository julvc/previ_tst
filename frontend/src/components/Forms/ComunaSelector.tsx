import type { Comuna } from '../../types';

interface ComunaSelectorProps {
    comunas: Comuna[];
    selectedComunaId: number | null;
    onComunaSelect: (comunaId: number | null) => void;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export const ComunaSelector = ({
    comunas,
    selectedComunaId,
    onComunaSelect,
    loading = false,
    disabled = false,
    placeholder = '-- Selecciona una comuna --'
}: ComunaSelectorProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const comunaId = value ? parseInt(value) : null;
        onComunaSelect(comunaId);
    };

    return (
        <div className="comuna-selector-container">
            <label htmlFor="comuna-select" className="comuna-selector-label">
                Comuna *
            </label>

            <select
                id="comuna-select"
                value={selectedComunaId || ''}
                onChange={handleChange}
                disabled={loading || disabled || comunas.length === 0}
                className="comuna-selector"
                required
            >
                <option value="">{placeholder}</option>
                {comunas.map((comuna) => (
                    <option key={comuna.id} value={comuna.id}>
                        {comuna.nombre}
                    </option>
                ))}
            </select>

            {loading && <span className="loading-indicator">⏳</span>}
            {comunas.length === 0 && !loading && !disabled && (
                <span className="no-options">Selecciona una región primero</span>
            )}
        </div>
    );
};