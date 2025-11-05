import { useState } from 'react';
import EditableCard from '../EditableCard';

/**
 * EditableEducation - Edit mode version of Education component
 * 
 * @param {Array} education - List of education objects
 * @param {function} onChange - function(newEducationArray)
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
        const confirmed = window.confirm(
            'Are you sure you want to delete this education entry?'
        );
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
        return <p className="editable-education-empty">No education entries yet. Click + to add one.</p>;
    }

    return (
        <div className="editable-education-container">
            {education.map((edu, index) => (
                <EditableCard
                    key={edu.id}
                    index={index}
                    onDelete={() => handleDelete(index)}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                >
                    <div className="editable-education-card">
                        <div className="editable-education-header">
                            <div className="editable-education-content">
                                {edu.image && (
                                    <img
                                        src={edu.image}
                                        alt={`${edu.institution} logo`}
                                        className="editable-education-logo"
                                    />
                                )}
                                <div className="editable-education-content-inner">
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => handleFieldChange(index, 'degree', e.target.value)}
                                        className="editable-education-degree-input"
                                        placeholder="Degree"
                                    />
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => handleFieldChange(index, 'institution', e.target.value)}
                                        className="editable-education-institution-input"
                                        placeholder="Institution"
                                    />
                                    <input
                                        type="text"
                                        value={edu.field || ''}
                                        onChange={(e) => handleFieldChange(index, 'field', e.target.value)}
                                        className="editable-education-field-input"
                                        placeholder="Field of Study (optional)"
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                value={edu.duration}
                                onChange={(e) => handleFieldChange(index, 'duration', e.target.value)}
                                className="editable-education-duration-input"
                                placeholder="Duration"
                            />
                        </div>

                        <div className="editable-education-achievements-wrapper">
                            <label className="editable-education-achievements-label">Achievements</label>
                            <textarea
                                value={(edu.achievements || []).join(',')}
                                onChange={(e) => handleArrayFieldChange(index, 'achievements', e.target.value)}
                                className="editable-education-achievements-textarea"
                                rows="2"
                                placeholder="Achievement 1,Achievement 2"
                            />
                        </div>

                        {edu.achievements && edu.achievements.length > 0 && (
                            <ul className="editable-education-achievements-list">
                                {edu.achievements.map((achievement, idx) => (
                                    <li key={idx} className="editable-education-achievement">
                                        <span className="editable-education-achievement-icon">▸</span>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </EditableCard>
            ))}
        </div>
    );
};

export default EditableEducation;
