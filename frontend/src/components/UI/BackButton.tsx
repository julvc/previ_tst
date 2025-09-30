import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    to?: string;
    className?: string;
    children?: React.ReactNode;
}

export const BackButton = ({
    to,
    className = "btn-secondary",
    children = "← Volver"
}: BackButtonProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button onClick={handleBack} className={className}>
            {children}
        </button>
    );
};