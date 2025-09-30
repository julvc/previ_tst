import { describe, it, expect } from 'vitest';

describe('Import Tests', () => {
    it('should import SearchForm', async () => {
        const { SearchForm } = await import('../components/Forms/SearchForm');
        expect(SearchForm).toBeDefined();
        expect(typeof SearchForm).toBe('function');
    });

    it('should import RegionesTable', async () => {
        const { RegionesTable } = await import('../components/UI/RegionesTable');
        expect(RegionesTable).toBeDefined();
        expect(typeof RegionesTable).toBe('function');
    });

    it('should import LoadingSpinner', async () => {
        const { LoadingSpinner } = await import('../components/UI/LoadingSpinner');
        expect(LoadingSpinner).toBeDefined();
        expect(typeof LoadingSpinner).toBe('function');
    });

    it('should import ErrorMessage', async () => {
        const { ErrorMessage } = await import('../components/UI/ErrorMessage');
        expect(ErrorMessage).toBeDefined();
        expect(typeof ErrorMessage).toBe('function');
    });

    it('should import hooks', async () => {
        const { useRegion } = await import('../hooks/useRegion');
        const { useSearch } = await import('../hooks/useSearch');

        expect(useRegion).toBeDefined();
        expect(useSearch).toBeDefined();
        expect(typeof useRegion).toBe('function');
        expect(typeof useSearch).toBe('function');
    });
});