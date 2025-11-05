import { useState } from 'react';
import EditableCard from '../EditableCard';

/**
 * EditableExperiences - Edit mode version of Experiences component
 * 
 * @param {Array} experiences - List of experience objects
 * @param {function} onChange - function(newExperiencesArray)
 */
const EditableExperiences = ({ experiences = [], onChange }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
    };

    const handleDrop = (e, dropIndex) => {
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newExperiences = [...experiences];
        const [draggedItem] = newExperiences.splice(draggedIndex, 1);
        newExperiences.splice(dropIndex, 0, draggedItem);

        onChange(newExperiences);
        setDraggedIndex(null);
    };

    const handleDelete = (index) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this experience?'
        );
        if (confirmed) {
            const newExperiences = experiences.filter((_, i) => i !== index);
            onChange(newExperiences);
        }
    };

    const handleFieldChange = (index, field, value) => {
        const newExperiences = [...experiences];
        newExperiences[index] = {
            ...newExperiences[index],
            [field]: value,
        };
        onChange(newExperiences);
    };

    const handleTechnologiesChange = (index, value) => {
        // Just store the raw string value
        handleFieldChange(index, 'technologies', value);
    };

    const handleTechnologiesBlur = (index, value) => {
        // Convert string to array on blur
        if (typeof value === 'string') {
            const array = value.split(',').map((item) => item.trim()).filter((item) => item);
            handleFieldChange(index, 'technologies', array);
        }
    };

    if (experiences.length === 0) {
        return <p className="editable-experiences-empty">No experience entries yet. Click + to add one.</p>;
    }

    return (
        <div className="editable-experiences-container">
            {experiences.map((exp, index) => (
                <EditableCard
                    key={exp.id}
                    index={index}
                    onDelete={() => handleDelete(index)}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                >
                    <div className="editable-experiences-card">
                        <div className="editable-experiences-header">
                            <div className="editable-experiences-content">
                                {exp.image && (
                                    <img
                                        src={exp.image}
                                        alt={`${exp.company} logo`}
                                        className="editable-experiences-logo"
                                    />
                                )}
                                <div className="editable-experiences-content-inner">
                                    <input
                                        type="text"
                                        value={exp.position}
                                        onChange={(e) => handleFieldChange(index, 'position', e.target.value)}
                                        className="editable-experiences-position-input"
                                        placeholder="Position"
                                    />
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => handleFieldChange(index, 'company', e.target.value)}
                                        className="editable-experiences-company-input"
                                        placeholder="Company"
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleFieldChange(index, 'duration', e.target.value)}
                                className="editable-experiences-duration-input"
                                placeholder="Duration"
                            />
                        </div>

                        <textarea
                            value={exp.description}
                            onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                            className="editable-experiences-description-textarea"
                            rows="3"
                            placeholder="Description"
                        />

                        <div className="editable-experiences-technologies-wrapper">
                            <label className="editable-experiences-technologies-label">Technologies</label>
                            <input
                                type="text"
                                value={Array.isArray(exp.technologies) ? exp.technologies.join(',') : exp.technologies || ''}
                                onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                                onBlur={(e) => handleTechnologiesBlur(index, e.target.value)}
                                className="editable-experiences-technologies-input"
                                placeholder="Python,React"
                            />
                        </div>

                        {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                            <div className="editable-experiences-technologies-preview">
                                {exp.technologies.map((tech, idx) => (
                                    <span key={idx} className="editable-experiences-tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </EditableCard>
            ))}
        </div>
    );
};

export default EditableExperiences;
