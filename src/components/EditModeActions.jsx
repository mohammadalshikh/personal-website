import { useEditMode } from '../contexts/EditModeContext';

/**
 * EditModeActions - Action buttons for edit mode in modals
 * 
 * Props:
 * @param {function} onAdd - Handler for add new card button
 */
const EditModeActions = ({ onAdd }) => {
    const { isDirty, isLoading, saveChanges, undoChanges } = useEditMode();

    const handleSave = async () => {
        await saveChanges();
    };

    return (
        <div className="flex items-center gap-2">
            {/* Undo Button */}
            <button
                onClick={undoChanges}
                disabled={!isDirty || isLoading}
                className={`p-2 rounded-lg transition-all ${
                    isDirty && !isLoading
                        ? 'bg-space-darker hover:bg-gray-700 text-gray-300 border border-gray-600'
                        : 'bg-gray-800 text-gray-600 border border-gray-800 cursor-not-allowed'
                }`}
                title="Undo all changes"
                aria-label="Undo changes"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            </button>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={!isDirty || isLoading}
                className={`p-2 rounded-lg transition-all ${
                    isDirty && !isLoading
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
                title="Save changes"
                aria-label="Save changes"
            >
                {isLoading ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            {/* Add New Card Button */}
            <button
                onClick={onAdd}
                disabled={isLoading}
                className="p-2 bg-space-purple hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add new card"
                aria-label="Add new card"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};

export default EditModeActions;
