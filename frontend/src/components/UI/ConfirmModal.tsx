import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: 'danger' | 'success' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    type = 'info'
}) => {
    if (!isOpen) return null;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    const getButtonColor = () => {
        switch (type) {
            case 'danger':
                return '#dc2626';
            case 'success':
                return '#16a34a';
            default:
                return '#3b82f6';
        }
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
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
            onClick={onCancel}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div
                role="alertdialog"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '24px',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    zIndex: 1000000
                }}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                <h3
                    id="modal-title"
                    style={{
                        margin: '0 0 16px 0',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#1f2937'
                    }}
                >
                    {title}
                </h3>
                <p style={{
                    margin: '0 0 24px 0',
                    color: '#6b7280',
                    lineHeight: '1.5'
                }}>
                    {message}
                </p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px'
                }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: getButtonColor(),
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;