import { useState, useEffect } from 'react';
import { uploadImage } from '../services/dataService';

/**
 * FormModal - Modal for adding new cards. Adapts fields based on section type
 * 
 * @param {boolean} isOpen - Modal visibility
 * @param {function} onClose - Close handler
 * @param {function} onSubmit - Submit handler with form data
 * @param {string} sectionType - Type (experiences, education, etc.)
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

    const getInitialFormData = (type) => {
        switch (type) {
            case 'experiences':
                return {
                    company: '',
                    position: '',
                    duration: '',
                    description: '',
                    technologies: '',
                };
            case 'education':
                return {
                    institution: '',
                    degree: '',
                    field: '',
                    duration: '',
                    achievements: '',
                };
            case 'projects':
                return {
                    name: '',
                    description: '',
                    technologies: '',
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
        setFormData((prev) => ({ ...prev, [field]: value }));
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

        const parsed = { ...formData };
        ['technologies', 'achievements'].forEach((key) => {
            if (key in parsed && typeof parsed[key] === 'string') {
                parsed[key] = parsed[key]
                    .split(',')
                    .map((item) => item.trim())
                    .filter((item) => item);
            }
        });

        const newCard = {
            ...parsed,
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
                            <label className="form-modal-label">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                value={formData.company || ''}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className="form-modal-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Position *
                            </label>
                            <input
                                type="text"
                                value={formData.position || ''}
                                onChange={(e) => handleChange('position', e.target.value)}
                                className="form-modal-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Duration * (Jan. 2025 - Apr. 2025)
                            </label>
                            <input
                                type="text"
                                value={formData.duration || ''}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                className="form-modal-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Description *
                            </label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="form-modal-input"
                                rows="4"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Technologies
                            </label>
                            <input
                                type="text"
                                value={formData.technologies || ''}
                                onChange={(e) => handleArrayChange('technologies', e.target.value)}
                                className="form-modal-input"
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
                            <label className="form-modal-label">
                                Institution *
                            </label>
                            <input
                                type="text"
                                value={formData.institution || ''}
                                onChange={(e) => handleChange('institution', e.target.value)}
                                className="form-modal-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Degree *
                            </label>
                            <input
                                type="text"
                                value={formData.degree || ''}
                                onChange={(e) => handleChange('degree', e.target.value)}
                                className="form-modal-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Field of Study
                            </label>
                            <input
                                type="text"
                                value={formData.field || ''}
                                onChange={(e) => handleChange('field', e.target.value)}
                                className="form-modal-input"
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Duration * (Jan. 2025 - Apr. 2025)
                            </label>
                            <input
                                type="text"
                                value={formData.duration || ''}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                className="form-modal-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Achievements
                            </label>
                            <textarea
                                value={formData.achievements || ''}
                                onChange={(e) => handleArrayChange('achievements', e.target.value)}
                                className="form-modal-input"
                                rows="3"
                                placeholder="Achievement1,Achievement2"
                            />
                        </div>
                        {renderImageUpload()}
                    </>
                );

            case 'projects':
                return (
                    <>
                        <div>
                            <label className="form-modal-label">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="form-modal-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Description *
                            </label>
                            <textarea
                                value={formData.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="form-modal-input"
                                rows="3"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Technologies *
                            </label>
                            <input
                                type="text"
                                value={formData.technologies || ''}
                                onChange={(e) => handleArrayChange('technologies', e.target.value)}
                                className="form-modal-input"
                                placeholder="Python,React"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                Live Demo Link
                            </label>
                            <input
                                type="url"
                                value={formData.link || ''}
                                onChange={(e) => handleChange('link', e.target.value)}
                                className="form-modal-input"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <label className="form-modal-label">
                                GitHub Link
                            </label>
                            <input
                                type="url"
                                value={formData.github || ''}
                                onChange={(e) => handleChange('github', e.target.value)}
                                className="form-modal-input"
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
            <label className="form-modal-label">
                Logo/Image
            </label>
            <div className="form-modal-upload-wrapper">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-modal-upload-hidden"
                    id="image-upload"
                    disabled={isUploading}
                />
                <label
                    htmlFor="image-upload"
                    className={`form-modal-upload-button ${isUploading ? 'form-modal-upload-button-disabled' : ''
                        }`}
                >
                    {isUploading ? 'Uploading...' : 'Choose File'}
                </label>
                {uploadedImageUrl && (
                    <img
                        src={uploadedImageUrl}
                        alt="Uploaded preview"
                        className="form-modal-upload-preview"
                    />
                )}
            </div>
            <p className="form-modal-upload-hint">Max 5MB. Supports JPG, PNG, GIF</p>
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
            className="form-modal-overlay"
            onClick={onClose}
        >
            <div
                className="form-modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="form-modal-header">
                    <h2 className={`form-modal-title bg-gradient-to-r ${colorGradients[color]} bg-clip-text text-transparent`}>
                        Add New {sectionType === 'experiences' ? 'Experience' : sectionType === 'education' ? 'Education' : 'Project'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="form-modal-close"
                        aria-label="Close"
                    >
                        <svg className="form-modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="form-modal-body">
                    {renderFields()}

                    <div className="form-modal-buttons">
                        <button
                            type="button"
                            onClick={onClose}
                            className="form-modal-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="form-modal-submit"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormModal;
