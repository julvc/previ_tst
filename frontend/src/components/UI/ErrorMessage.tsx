interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    showRetry?: boolean;
}

export const ErrorMessage = ({
    message,
    onRetry,
    showRetry = false
}: ErrorMessageProps) => (
    <div className="error-message">
        <div className="error-icon">⚠️</div>
        <div className="error-content">
            <h3>Error</h3>
            <p>{message}</p>
            {showRetry && onRetry && (
                <button onClick={onRetry} className="btn-secondary">
                    Reintentar
                </button>
            )}
        </div>
    </div>
);