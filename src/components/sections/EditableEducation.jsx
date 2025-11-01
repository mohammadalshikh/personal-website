import { useState } from 'react';
import EditableCard from '../EditableCard';

/**
 * EditableEducation - Edit mode version of Education component
 */
const EditableEducation = ({ education = [], onChange }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
    };

    const handleDrop = (e, dropIndex) => {
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newEducation = [...education];
        const [draggedItem] = newEducation.splice(draggedIndex, 1);
        newEducation.splice(dropIndex, 0, draggedItem);

        onChange(newEducation);
        setDraggedIndex(null);
    };

    const handleDelete = (index) => {
        const confirmed = window.confirm('Are you sure you want to delete this education entry?');
        if (confirmed) {
            const newEducation = education.filter((_, i) => i !== index);
            onChange(newEducation);
        }
    };

    const handleFieldChange = (index, field, value) => {
        const newEducation = [...education];
        newEducation[index] = {
            ...newEducation[index],
            [field]: value,
        };
        onChange(newEducation);
    };

    const handleArrayFieldChange = (index, field, value) => {
        const array = value.split(',').map((item) => item.trim()).filter((item) => item);
        handleFieldChange(index, field, array);
    };

    if (education.length === 0) {
        return <p className="text-gray-400 text-center py-8">No education entries yet. Click + to add one.</p>;
    }

    return (
        <div className="space-y-6 pl-8">
            {education.map((edu, index) => (
                <EditableCard
                    key={edu.id}
                    index={index}
                    onDelete={() => handleDelete(index)}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                >
                    <div className="card">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                            <div className="flex items-center gap-3 flex-1">
                                {edu.image && (
                                    <img
                                        src={edu.image}
                                        alt={`${edu.institution} logo`}
                                        className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg p-1"
                                    />
                                )}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => handleFieldChange(index, 'degree', e.target.value)}
                                        className="edit-input text-xl md:text-2xl font-bold text-space-blue bg-transparent border-b border-space-blue/30 focus:border-space-blue w-full"
                                        placeholder="Degree"
                                    />
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => handleFieldChange(index, 'institution', e.target.value)}
                                        className="edit-input text-lg text-space-cyan font-semibold bg-transparent border-b border-space-cyan/30 focus:border-space-cyan w-full mt-1"
                                        placeholder="Institution"
                                    />
                                    <input
                                        type="text"
                                        value={edu.field || ''}
                                        onChange={(e) => handleFieldChange(index, 'field', e.target.value)}
                                        className="edit-input text-gray-400 text-sm bg-transparent border-b border-gray-600 focus:border-gray-400 w-full mt-1"
                                        placeholder="Field of Study (optional)"
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                value={edu.duration}
                                onChange={(e) => handleFieldChange(index, 'duration', e.target.value)}
                                className="edit-input duration-text bg-transparent border-b border-gray-600 focus:border-gray-400 text-center"
                                placeholder="Duration"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="text-xs text-gray-500 mb-1 block">Achievements (comma-separated)</label>
                            <textarea
                                value={(edu.achievements || []).join(', ')}
                                onChange={(e) => handleArrayFieldChange(index, 'achievements', e.target.value)}
                                className="edit-input text-sm text-gray-400 bg-transparent border border-gray-600 focus:border-gray-400 rounded p-2 w-full resize-none"
                                rows="2"
                                placeholder="Achievement 1, Achievement 2"
                            />
                        </div>

                        {edu.achievements && edu.achievements.length > 0 && (
                            <ul className="space-y-2 mt-4">
                                {edu.achievements.map((achievement, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                                        <span className="text-space-blue">▸</span>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
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

export default EditableEducation;
