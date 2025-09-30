interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
}

export const LoadingSpinner = ({
    message = 'Cargando...',
    size = 'medium'
}: LoadingSpinnerProps) => (
    <div className={`loading-spinner loading-spinner--${size}`}>
        <div className="spinner" />
        <p className="loading-message">{message}</p>
    </div>
);