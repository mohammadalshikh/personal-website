import { useState, useEffect } from 'react';
import { uploadImage } from '../services/dataService';

/**
 * FormModal - Modal for adding new cards
 * Adapts fields based on section type
 * 
 * Props:
 * @param {boolean} isOpen - Modal visibility
 * @param {function} onClose - Close handler
 * @param {function} onSubmit - Submit handler with form data
 * @param {string} sectionType - Type: 'experiences', 'education', 'projects', 'about'
 * @param {string} color - Theme color
 */
const FormModal = ({ isOpen, onClose, onSubmit, sectionType, color = 'purple' }) => {
    const [formData, setFormData] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialFormData(sectionType));
            setUploadedImageUrl('');
        }
    }, [isOpen, sectionType]);

    // Close on Escape
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

    const getInitialFormData = (type) => {
        switch (type) {
            case 'experiences':
                return {
                    company: '',
                    position: '',
                    duration: '',
                    description: '',
                    technologies: [],
                };
            case 'education':
                return {
                    institution: '',
                    degree: '',
                    field: '',
                    duration: '',
                    achievements: [],
                };
            case 'projects':
                return {
                    name: '',
                    description: '',
                    technologies: [],
                    link: '',
                    github: '',
                };
            default:
                return {};
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleArrayChange = (field, value) => {
        // Split by comma and trim
        const array = value.split(',').map((item) => item.trim()).filter((item) => item);
        setFormData((prev) => ({ ...prev, [field]: array }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        setIsUploading(true);
        try {
            const url = await uploadImage(file);
            setUploadedImageUrl(url);
            setFormData((prev) => ({ ...prev, image: url }));
            alert('Image uploaded successfully!');
        } catch {
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Add unique ID
        const newCard = {
            ...formData,
            id: Date.now(),
        };

        onSubmit(newCard);
        onClose();
    };

    const renderFields = () => {
        switch (sectionType) {
            case 'experiences':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                value={formData.company || ''}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Position *
                            </label>
                            <input
                                type="text"
                                value={formData.position || ''}
                                onChange={(e) => handleChange('position', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Duration * (Jan. 2025 - Apr. 2025)
                            </label>
                            <input
                                type="text"
                                value={formData.duration || ''}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Description *
                            </label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="form-input"
                                rows="4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Technologies
                            </label>
                            <input
                                type="text"
                                value={(formData.technologies || []).join(', ')}
                                onChange={(e) => handleArrayChange('technologies', e.target.value)}
                                className="form-input"
                                placeholder="Python,React"
                            />
                        </div>
                        {renderImageUpload()}
                    </>
                );

            case 'education':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Institution *
                            </label>
                            <input
                                type="text"
                                value={formData.institution || ''}
                                onChange={(e) => handleChange('institution', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Degree *
                            </label>
                            <input
                                type="text"
                                value={formData.degree || ''}
                                onChange={(e) => handleChange('degree', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Field of Study
                            </label>
                            <input
                                type="text"
                                value={formData.field || ''}
                                onChange={(e) => handleChange('field', e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Duration * (Jan. 2025 - Apr. 2025)
                            </label>
                            <input
                                type="text"
                                value={formData.duration || ''}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Achievements
                            </label>
                            <textarea
                                value={(formData.achievements || []).join(', ')}
                                onChange={(e) => handleArrayChange('achievements', e.target.value)}
                                className="form-input"
                                rows="3"
                                placeholder="Achievement 1, Achievement 2"
                            />
                        </div>
                        {renderImageUpload()}
                    </>
                );

            case 'projects':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Description *
                            </label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="form-input"
                                rows="3"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Technologies *
                            </label>
                            <input
                                type="text"
                                value={(formData.technologies || []).join(', ')}
                                onChange={(e) => handleArrayChange('technologies', e.target.value)}
                                className="form-input"
                                placeholder="Python,React"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Live Demo Link
                            </label>
                            <input
                                type="url"
                                value={formData.link || ''}
                                onChange={(e) => handleChange('link', e.target.value)}
                                className="form-input"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                GitHub Link
                            </label>
                            <input
                                type="url"
                                value={formData.github || ''}
                                onChange={(e) => handleChange('github', e.target.value)}
                                className="form-input"
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    const renderImageUpload = () => (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
                Logo/Image
            </label>
            <div className="flex items-center gap-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                />
                <label
                    htmlFor="image-upload"
                    className={`px-4 py-2 bg-space-darker border border-space-purple/30 rounded-lg cursor-pointer hover:border-space-purple transition-colors text-sm ${
                        isUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isUploading ? 'Uploading...' : 'Choose File'}
                </label>
                {uploadedImageUrl && (
                    <img
                        src={uploadedImageUrl}
                        alt="Uploaded preview"
                        className="w-12 h-12 object-contain rounded-lg border border-space-purple/30"
                    />
                )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Max 5MB. Supports JPG, PNG, GIF</p>
        </div>
    );

    const colorGradients = {
        purple: 'from-space-purple to-purple-600',
        blue: 'from-space-blue to-blue-600',
        cyan: 'from-space-cyan to-cyan-600',
        pink: 'from-space-pink to-pink-600',
        orange: 'from-space-orange to-orange-600',
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-space-dark border-2 border-space-purple/50 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-bold bg-gradient-to-r ${colorGradients[color]} bg-clip-text text-transparent`}>
                        Add New {sectionType === 'experiences' ? 'Experience' : sectionType === 'education' ? 'Education' : 'Project'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {renderFields()}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-space-darker border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="flex-1 px-4 py-3 bg-space-purple hover:bg-purple-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .form-input {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #0f1419;
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 0.5rem;
                    color: white;
                    transition: border-color 0.2s;
                }
                .form-input:focus {
                    outline: none;
                    border-color: #8b5cf6;
                }
                .form-input::placeholder {
                    color: #6b7280;
                }
            `}</style>
        </div>
    );
};

export default FormModal;
