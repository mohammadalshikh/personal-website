/**
 * Education Component - Displays educational background
 * 
 * @param {Array} education - Array of education objects
 */
const Education = ({ education = [] }) => {
    return (
        <div className="education-container">
            {education.length === 0 ? (
                <p className="education-empty">No education entries yet.</p>
            ) : (
                education.map((edu) => (
                    <div key={edu.id} className="education-card">
                        <div className="education-header">
                            <div className="education-content">
                                {edu.image && (
                                    <img
                                        src={edu.image}
                                        alt={`${edu.institution} logo`}
                                        className="education-logo"
                                    />
                                )}
                                <div>
                                    <h3 className="education-degree">
                                        {edu.degree}
                                    </h3>
                                    <p className="education-institution">
                                        {edu.institution}
                                    </p>
                                    {edu.field && (
                                        <p className="education-field">
                                            {edu.field}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <span className="education-duration">
                                {edu.duration}
                            </span>
                        </div>

                        {edu.achievements && edu.achievements.length > 0 && (
                            <ul className="education-achievements">
                                {edu.achievements.map((achievement, idx) => (
                                    <li key={idx} className="education-achievement">
                                        <span className="education-achievement-icon">▸</span>
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
