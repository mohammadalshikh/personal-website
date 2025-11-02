import { createContext, useState, useContext, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { fetchData, saveData, validateConfig } from '../services/dataService';

const EditModeContext = createContext();

/**
 * Password verification using SHA-256
 */
const verifyPassword = (password) => {
    const hash = CryptoJS.SHA256(password).toString();
    const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
    return hash === storedHash;
};

/**
 * EditModeProvider - Manages edit mode state and data synchronization
 */
export const EditModeProvider = ({ children, initialData }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState(initialData);
    const [originalData, setOriginalData] = useState(initialData);
    const [isDirty, setIsDirty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [configValid, setConfigValid] = useState(false);
    const [binConnected, setBinConnected] = useState(false);
    const [logsCount, setLogsCount] = useState(0);

    // Validate configuration on mount
    useEffect(() => {
        const isValid = validateConfig();
        setConfigValid(isValid);
    }, []);

    // Load data from backend on mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const { data: fetchedData, success } = await fetchData();
                
                if (success) {
                    // Successfully fetched from bin - use bin data
                    setData(fetchedData);
                    setOriginalData(fetchedData);
                    setLogsCount(fetchedData.logs || 0);
                    setBinConnected(true);
                    console.log('✅ Connected to JSONBin - Using live data');
                } else {
                    // Fetch failed - use fallback initialData (sample data)
                    setData(initialData);
                    setOriginalData(initialData);
                    setLogsCount(0);
                    setBinConnected(false);
                    console.warn('⚠️ JSONBin connection failed - Using sample fallback data');
                }
            } catch {
                // Failed to load data, will use initialData
                setData(initialData);
                setOriginalData(initialData);
                setLogsCount(0);
                setBinConnected(false);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [initialData]);

    // Check if data has changed
    useEffect(() => {
        const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);
        setIsDirty(hasChanges);
    }, [data, originalData]);

    /**
     * Attempt to enter edit mode with password
     */
    const enterEditMode = (password) => {
        if (verifyPassword(password)) {
            setIsEditMode(true);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    /**
     * Exit edit mode
     */
    const exitEditMode = () => {
        if (isDirty) {
            const confirmed = window.confirm(
                'You have unsaved changes. Are you sure you want to exit edit mode?'
            );
            if (!confirmed) {
                return false;
            }
        }
        
        setIsEditMode(false);
        setIsAuthenticated(false);
        setData(originalData);
        setIsDirty(false);
        return true;
    };

    /**
     * Update data
     */
    const updateData = (newData) => {
        setData(newData);
    };

    /**
     * Save changes to backend
     */
    const saveChanges = async () => {
        if (!configValid) {
            alert('Backend not configured. Changes are only saved locally.');
            setOriginalData(data);
            setIsDirty(false);
            return true;
        }

        setIsLoading(true);
        try {
            await saveData(data);
            setOriginalData(data);
            setIsDirty(false);
            alert('Changes saved successfully!');
            return true;
        } catch {
            alert('Failed to save changes. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Undo all changes
     */
    const undoChanges = () => {
        if (!isDirty) {
            return;
        }

        const confirmed = window.confirm(
            'Are you sure you want to undo all changes?'
        );
        
        if (confirmed) {
            setData(originalData);
            setIsDirty(false);
        }
    };

    /**
     * Update specific section
     */
    const updateSection = (section, newValue) => {
        setData((prev) => ({
            ...prev,
            [section]: newValue,
        }));
    };

    const value = {
        isEditMode,
        isAuthenticated,
        data,
        originalData,
        isDirty,
        isLoading,
        configValid,
        binConnected,
        logsCount,
        enterEditMode,
        exitEditMode,
        updateData,
        saveChanges,
        undoChanges,
        updateSection,
    };

    return (
        <EditModeContext.Provider value={value}>
            {children}
        </EditModeContext.Provider>
    );
};

/**
 * Hook to use edit mode context
 */
export const useEditMode = () => {
    const context = useContext(EditModeContext);
    if (!context) {
        throw new Error('useEditMode must be used within EditModeProvider');
    }
    return context;
};
