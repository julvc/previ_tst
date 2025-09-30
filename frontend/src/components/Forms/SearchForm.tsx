import type { ReactNode } from 'react';

interface SearchFormProps {
    searchTerm: string;
    onSearchTermChange: (value: string) => void;
    onSearch: () => void;
    onClear?: () => void;
    placeholder: string;
    searching: boolean;
    disabled?: boolean;
    searchResult?: ReactNode;
    error?: string | null;
    label?: string;
    inputType?: 'text' | 'number';
}


export const SearchForm = ({
    searchTerm,
    onSearchTermChange,
    onSearch,
    onClear,
    placeholder,
    searching,
    disabled = false,
    searchResult,
    error,
    label,
    inputType = 'text'
}: SearchFormProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch();
    };

    const canSearch = searchTerm.trim().length > 0 && !searching && !disabled;
    const showClearButton = onClear && searchTerm.length > 0;

    return (
        <div className="search-form-container">
            {label && (
                <h2 className="search-form-title">{label}</h2>
            )}

            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-group">
                    <input
                        type={inputType}
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={searching || disabled}
                        className={`search-input ${error ? 'search-input--error' : ''}`}
                        autoComplete="off"
                    />

                    <div className="search-actions">
                        <button
                            type="submit"
                            disabled={!canSearch}
                            className={`btn-primary ${!canSearch ? 'btn-primary--disabled' : ''}`}
                        >
                            {searching ? (
                                <>
                                    <span className="loading-spinner-small"></span>
                                    <p>Buscando...</p>
                                </>
                            ) : (
                                'Buscar'
                            )}
                        </button>

                        {showClearButton && (
                            <button
                                type="button"
                                onClick={onClear}
                                className="btn-secondary"
                                disabled={searching}
                                title="Limpiar búsqueda"
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* Estado de error */}
            {error && (
                <div className="search-error">
                    <span className="error-icon">⚠️</span>
                    <span className="error-text">{error}</span>
                </div>
            )}

            {/* Resultado de búsqueda */}
            {searchResult && (
                <div className="search-result">
                    {searchResult}
                </div>
            )}

            {/* Estado vacío cuando no hay resultado después de buscar */}
            {!searching && !error && !searchResult && searchTerm && (
                <div className="search-empty">
                    <span className="empty-icon">🔍</span>
                    <span>No se encontraron resultados</span>
                </div>
            )}
        </div>
    );
};