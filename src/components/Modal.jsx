import { useEffect } from 'react';

/**
 * Modal Component - Reusable modal/window
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {string} color - Theme color matching planet colors
 * @param {ReactNode} children - Modal content
 * @param {ReactNode} editModeActions - Optional edit mode action buttons
 */
const Modal = ({ isOpen, onClose, title, color = 'purple', children, editModeActions }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const colorGradients = {
        purple: 'from-space-purple to-purple-600',
        blue: 'from-space-blue to-blue-600',
        cyan: 'from-space-cyan to-cyan-600',
        pink: 'from-space-pink to-pink-600',
        orange: 'from-space-orange to-orange-600',
    };

    return (
        <div
            className="modal-overlay animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="modal-content animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="modal-header">
                    {/* Title */}
                    <h2
                        id="modal-title"
                        className={`section-title bg-gradient-to-r ${colorGradients[color]}`}
                    >
                        {title}
                    </h2>

                    <div className="modal-header-actions">
                        {editModeActions}

                        <button
                            onClick={onClose}
                            className="btn-close"
                            aria-label="Close modal"
                        >
                            <svg
                                className="modal-close-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
