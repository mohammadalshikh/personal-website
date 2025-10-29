/**
 * Education Component - Displays educational background
 * Designed to accept data props and be backend-ready
 * 
 * Props:
 * @param {Array} education - Array of education objects
 *   Each object: { id, institution, degree, field, duration, achievements, image }
 */
const Education = ({ education = [] }) => {
    return (
        <div className="space-y-6">
            {education.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No education entries yet.</p>
            ) : (
                education.map((edu) => (
                    <div key={edu.id} className="card">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                            <div className="flex items-center gap-3">
                                {edu.image && (
                                    <img
                                        src={edu.image}
                                        alt={`${edu.institution} logo`}
                                        className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg p-1"
                                    />
                                )}
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-space-blue">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-lg text-space-cyan font-semibold">
                                        {edu.institution}
                                    </p>
                                    {edu.field && (
                                        <p className="text-gray-400 text-sm mt-1">
                                            {edu.field}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm text-gray-400 whitespace-nowrap">
                                {edu.duration}
                            </span>
                        </div>

                        {edu.achievements && edu.achievements.length > 0 && (
                            <ul className="space-y-2 mt-4">
                                {edu.achievements.map((achievement, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                                        <span className="text-space-blue mt-1">▸</span>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Education;
