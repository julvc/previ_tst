import React from 'react';

interface NotificationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    title,
    message,
    type,
    onClose
}) => {
    if (!isOpen) return null;

    const typeStyles = {
        success: {
            backgroundColor: '#dcfce7',
            borderColor: '#22c55e',
            iconColor: '#16a34a',
            titleColor: '#15803d',
            icon: '✅'
        },
        error: {
            backgroundColor: '#fef2f2',
            borderColor: '#ef4444',
            iconColor: '#dc2626',
            titleColor: '#dc2626',
            icon: '❌'
        },
        warning: {
            backgroundColor: '#fefce8',
            borderColor: '#eab308',
            iconColor: '#ca8a04',
            titleColor: '#a16207',
            icon: '⚠️'
        },
        info: {
            backgroundColor: '#eff6ff',
            borderColor: '#3b82f6',
            iconColor: '#2563eb',
            titleColor: '#1d4ed8',
            icon: 'ℹ️'
        }
    };

    const styles = typeStyles[type];

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: styles.backgroundColor,
                    border: `2px solid ${styles.borderColor}`,
                    borderRadius: '8px',
                    padding: '24px',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    zIndex: 1000000
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                        fontSize: '24px',
                        marginRight: '16px',
                        flexShrink: 0
                    }}>
                        {styles.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            margin: '0 0 8px 0',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: styles.titleColor
                        }}>
                            {title}
                        </h3>
                        <p style={{
                            margin: '0 0 20px 0',
                            color: '#374151',
                            lineHeight: '1.5'
                        }}>
                            {message}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: styles.borderColor,
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;