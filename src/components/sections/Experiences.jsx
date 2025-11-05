/**
 * Experiences Component - Displays career/work experience
 * 
 * @param {Array} experiences - Array of experience objects
 */
const Experiences = ({ experiences = [] }) => {
    return (
        <div className="experiences-container">
            {experiences.length === 0 ? (
                <p className="experiences-empty">No experience entries yet.</p>
            ) : (
                experiences.map((exp) => (
                    <div key={exp.id} className="experiences-card">
                        <div className="experiences-header">
                            <div className="experiences-content">
                                {exp.image && (
                                    <img
                                        src={exp.image}
                                        alt={`${exp.company} logo`}
                                        className="experiences-logo"
                                    />
                                )}
                                <div>
                                    <h3 className="experiences-position">
                                        {exp.position}
                                    </h3>
                                    <p className="experiences-company">
                                        {exp.company}
                                    </p>
                                </div>
                            </div>
                            <span className="experiences-duration">
                                {exp.duration}
                            </span>
                        </div>

                        <p className="experiences-description">
                            {exp.description}
                        </p>

                        {exp.technologies && exp.technologies.length > 0 && (
                            <div className="experiences-technologies">
                                {exp.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="experiences-tech-tag"
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
