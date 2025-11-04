import { useState, useEffect } from 'react';
import { useEditMode } from '../contexts/EditModeContext';

/**
 * PasswordModal - Modal for entering/exiting edit mode
 * 
 * @param {boolean} isOpen - Modal visibility
 * @param {function} onClose - Close handler
 * @param {boolean} isExitMode - True if exiting edit mode, false if entering
 */
const PasswordModal = ({ isOpen, onClose, isExitMode = false }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { enterEditMode, exitEditMode, binConnected, logsCount } = useEditMode();

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setPassword('');
            setError('');
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isExitMode) {
            // Exit edit mode
            const success = exitEditMode();
            if (success) {
                onClose();
            }
        } else {
            // Enter edit mode
            const success = enterEditMode(password);
            if (success) {
                onClose();
                setError('');
            } else {
                setError('Incorrect password. Please try again.');
                setPassword('');
            }
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center pt-20 sm:pt-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-space-dark border-2 border-space-purple/50 rounded-2xl p-4 sm:p-8 max-w-sm sm:max-w-md w-full mx-4 shadow-2xl animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-space-purple/20 rounded-full flex items-center justify-center">
                        {isExitMode ? (
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-space-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-space-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-space-purple to-purple-400 bg-clip-text text-transparent">
                    {isExitMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                </h2>

                {/* Status/Counter Display */}
                {isExitMode && (
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-400">
                            Log entries created: <span className="text-space-purple font-semibold">{logsCount}</span>
                        </p>
                    </div>
                )}
                {!isExitMode && (
                    <div className="text-center mb-4">
                        <p className={`text-sm font-semibold ${binConnected ? 'text-green-500' : 'text-red-500'}`}>
                            {binConnected ? '● Bin enabled' : '● Bin disabled'}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {!isExitMode && (
                        <div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-space-darker border border-space-purple/30 rounded-lg focus:outline-none focus:border-space-purple text-white placeholder-gray-500 transition-colors"
                                placeholder="Enter password"
                                autoFocus
                                required
                            />
                            {error && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-space-darker border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${isExitMode
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {isExitMode ? 'Exit' : 'Unlock'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordModal;
