import { useState } from 'react';
import EditableCard from '../EditableCard';

/**
 * EditableProjects - Edit mode version of Projects component
 * 
 * @param {Array} projects - List of project objects
 * @param {function} onChange - function(newProjectsArray)
 */
const EditableProjects = ({ projects = [], onChange }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
    };

    const handleDrop = (e, dropIndex) => {
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newProjects = [...projects];
        const [draggedItem] = newProjects.splice(draggedIndex, 1);
        newProjects.splice(dropIndex, 0, draggedItem);

        onChange(newProjects);
        setDraggedIndex(null);
    };

    const handleDelete = (index) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this project?'
        );
        if (confirmed) {
            const newProjects = projects.filter((_, i) => i !== index);
            onChange(newProjects);
        }
    };

    const handleFieldChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index] = {
            ...newProjects[index],
            [field]: value,
        };
        onChange(newProjects);
    };

    const handleTechnologiesChange = (index, value) => {
        handleFieldChange(index, 'technologies', value);
    };

    const handleTechnologiesBlur = (index, value) => {
        if (typeof value === 'string') {
            const array = value.split(',').map((item) => item.trim()).filter((item) => item);
            handleFieldChange(index, 'technologies', array);
        }
    };

    if (projects.length === 0) {
        return <p className="text-gray-400 text-center py-8">No projects yet. Click + to add one.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8">
            {projects.map((project, index) => (
                <EditableCard
                    key={project.id}
                    index={index}
                    onDelete={() => handleDelete(index)}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                >
                    <div className="card">
                        <input
                            type="text"
                            value={project.name}
                            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                            className="edit-input text-base md:text-lg font-bold text-space-pink mb-3 bg-transparent border-b border-space-pink/30 focus:border-space-pink w-full"
                            placeholder="Project Name"
                        />

                        <textarea
                            value={project.description}
                            onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                            className="edit-input text-xs md:text-sm text-gray-300 mb-4 leading-relaxed bg-transparent border border-gray-600 focus:border-gray-400 rounded p-2 w-full resize-none"
                            rows="3"
                            placeholder="Description"
                        />

                        <div className="mb-2">
                            <label className="text-xs text-gray-500 mb-1 block">Technologies</label>
                            <input
                                type="text"
                                value={Array.isArray(project.technologies) ? project.technologies.join(',') : project.technologies || ''}
                                onChange={(e) => handleTechnologiesChange(index, e.target.value)}
                                onBlur={(e) => handleTechnologiesBlur(index, e.target.value)}
                                className="edit-input text-sm text-gray-400 bg-transparent border-b border-gray-600 focus:border-gray-400 w-full mb-2"
                                placeholder="Python,React"
                            />
                        </div>

                        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, idx) => (
                                    <span key={idx} className="tech-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2 mb-4">
                            <input
                                type="url"
                                value={project.link || ''}
                                onChange={(e) => handleFieldChange(index, 'link', e.target.value)}
                                className="edit-input text-xs md:text-sm text-gray-400 bg-transparent border-b border-gray-600 focus:border-gray-400 w-full"
                                placeholder="Live Demo URL"
                            />
                            <input
                                type="url"
                                value={project.github || ''}
                                onChange={(e) => handleFieldChange(index, 'github', e.target.value)}
                                className="edit-input text-xs md:text-sm text-gray-400 bg-transparent border-b border-gray-600 focus:border-gray-400 w-full"
                                placeholder="GitHub URL"
                            />
                        </div>

                        <div className="flex gap-3">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                        </div>
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

export default EditableProjects;
