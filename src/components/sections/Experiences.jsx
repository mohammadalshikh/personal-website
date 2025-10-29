/**
 * Experiences Component - Displays career/work experience
 * Designed to accept data props and be backend-ready
 * 
 * Props:
 * @param {Array} experiences - Array of experience objects
 *   Each object: { id, company, position, duration, description, technologies, image }
 */
const Experiences = ({ experiences = [] }) => {
    return (
        <div className="space-y-6">
            {experiences.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No experience entries yet.</p>
            ) : (
                experiences.map((exp) => (
                    <div key={exp.id} className="card">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                            <div className="flex items-center gap-3">
                                {exp.image && (
                                    <img
                                        src={exp.image}
                                        alt={`${exp.company} logo`}
                                        className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg p-1"
                                    />
                                )}
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-space-cyan">
                                        {exp.position}
                                    </h3>
                                    <p className="text-lg text-space-purple font-semibold">
                                        {exp.company}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-400 whitespace-nowrap">
                                {exp.duration}
                            </span>
                        </div>

                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {exp.description}
                        </p>

                        {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="tech-tag"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Experiences;
