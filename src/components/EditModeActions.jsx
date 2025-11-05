import { useEditMode } from '../contexts/EditModeContext';

/**
 * EditModeActions - Action buttons for edit mode in modals
 * 
 * @param {function} onAdd - Handler for add new card button
 */
const EditModeActions = ({ onAdd, showAdd = true }) => {
    const { isDirty, isLoading, saveChanges, undoChanges } = useEditMode();

    const handleSave = async () => {
        await saveChanges();
    };

    return (
        <>
            <button
                onClick={undoChanges}
                disabled={!isDirty || isLoading}
                className={`edit-mode-actions-undo ${isDirty && !isLoading
                    ? 'edit-mode-actions-undo-enabled'
                    : 'edit-mode-actions-undo-disabled'
                    }`}
                title="Undo all changes"
                aria-label="Undo changes"
            >
                <svg className="edit-mode-actions-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            </button>

            <button
                onClick={handleSave}
                disabled={!isDirty || isLoading}
                className={`edit-mode-actions-save ${isDirty && !isLoading
                    ? 'edit-mode-actions-save-enabled'
                    : 'edit-mode-actions-save-disabled'
                    }`}
                title="Save changes"
                aria-label="Save changes"
            >
                {isLoading ? (
                    <svg className="edit-mode-actions-save-spinner" fill="none" viewBox="0 0 24 24">
                        <circle className="edit-mode-actions-save-spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="edit-mode-actions-save-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg className="edit-mode-actions-save-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            {showAdd && (
                <button
                    onClick={onAdd}
                    disabled={isLoading}
                    className="edit-mode-actions-add"
                    title="Add new card"
                    aria-label="Add new card"
                >
                    <svg className="edit-mode-actions-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            )}
        </>
    );
};

export default EditModeActions;
