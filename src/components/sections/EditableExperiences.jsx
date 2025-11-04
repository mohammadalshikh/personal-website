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
        return <p className="text-gray-400 text-center py-8">No experience entries yet. Click + to add one.</p>;
    }

    return (
        <div className="space-y-6 pl-8">
            {experiences.map((exp, index) => (
                <EditableCard
                    key={exp.id}
                    index={index}
                    onDelete={() => handleDelete(index)}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                >
                    <div className="card">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                            <div className="flex items-center gap-3 flex-1">
                                {exp.image && (
                                    <img
                                        src={exp.image}
                                        alt={`${exp.company} logo`}
                                        className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg p-1"
                                    />
                                )}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={exp.position}
                                        onChange={(e) => handleFieldChange(index, 'position', e.target.value)}
                                        className="edit-input text-base md:text-lg font-bold text-space-cyan bg-transparent border-b border-space-cyan/30 focus:border-space-cyan w-full"
                                        placeholder="Position"
                                    />
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => handleFieldChange(index, 'company', e.target.value)}
                                        className="edit-input text-base text-space-purple font-semibold bg-transparent border-b border-space-purple/30 focus:border-space-purple w-full mt-1"
                                        placeholder="Company"
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleFieldChange(index, 'duration', e.target.value)}
                                className="edit-input duration-text bg-transparent border-b border-gray-600 focus:border-gray-400 text-center"
                                placeholder="Duration"
                            />
                        </div>

                        <textarea
                            value={exp.description}
                            onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                            className="edit-input text-xs md:text-sm text-gray-300 mb-4 leading-relaxed bg-transparent border border-gray-600 focus:border-gray-400 rounded p-2 w-full resize-none"
                            rows="3"
                            placeholder="Description"
                        />

                        <div className="mb-2">
                            <label className="text-xs text-gray-500 mb-1 block">Technologies</label>
                            <input
                                type="text"
                                value={Array.isArray(exp.technologies) ? exp.technologies.join(',') : exp.technologies || ''}
                                onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                                onBlur={(e) => handleTechnologiesBlur(index, e.target.value)}
                                className="edit-input text-xs md:text-sm text-gray-400 bg-transparent border-b border-gray-600 focus:border-gray-400 w-full"
                                placeholder="Python,React"
                            />
                        </div>

                        {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {exp.technologies.map((tech, idx) => (
                                    <span key={idx} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </EditableCard>
            ))}

            <style jsx>{`
                .edit-input {
                    outline: none;
                    transition: border-color 0.2s;
                }
                .edit-input::placeholder {
                    color: #6b7280;
                }
            `}</style>
        </div>
    );
};

export default EditableExperiences;
