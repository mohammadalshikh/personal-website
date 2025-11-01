import { useState } from 'react';

/**
 * EditableCard - Wrapper component for editable cards with drag-and-drop
 * 
 * Props:
 * @param {ReactNode} children - Card content
 * @param {function} onDelete - Delete handler
 * @param {function} onDragStart - Drag start handler
 * @param {function} onDragOver - Drag over handler
 * @param {function} onDrop - Drop handler
 * @param {boolean} isDraggable - Whether card is draggable
 * @param {number} index - Card index
 */
const EditableCard = ({ 
    children, 
    onDelete, 
    onDragStart, 
    onDragOver, 
    onDrop,
    isDraggable = true,
    index 
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (e) => {
        setIsDragging(true);
        onDragStart?.(e, index);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        onDragOver?.(e, index);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        onDrop?.(e, index);
    };

    return (
        <div
            className={`relative ${isDragging ? 'opacity-50' : ''}`}
            draggable={isDraggable}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Drag Handle */}
            {isDraggable && (
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 cursor-move text-gray-600 hover:text-gray-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </div>
            )}

            {/* Delete Button */}
            <button
                onClick={onDelete}
                className="absolute -top-2 -right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg transition-colors"
                title="Delete"
                aria-label="Delete card"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Card Content */}
            {children}
        </div>
    );
};

export default EditableCard;
