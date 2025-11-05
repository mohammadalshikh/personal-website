/**
 * About Component - Displays personal information
 *
 * @param {Object} about - { intro, skills, interests }
 */
const About = ({ about = {} }) => {
    const { intro = '', skills = [], interests = [] } = about;

    return (
        <div className="about-container">
            {intro && (
                <div className="about-card">
                    <h3 className="about-card-title-welcome">
                        Welcome! 👋
                    </h3>
                    <p className="about-card-text">
                        {intro}
                    </p>
                </div>
            )}

            {skills.length > 0 && (
                <div className="about-card">
                    <h3 className="about-card-title-skills">
                        Skills & Technologies
                    </h3>
                    <div className="about-skills-list">
                        {skills.map((skill, idx) => (
                            <span key={idx} className="about-skill-tag">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {interests.length > 0 && (
                <div className="about-card-flex">
                    <h3 className="about-card-title-interests">
                        Interests & Hobbies
                    </h3>
                    <div className="about-interests-grid">
                        {interests.map((interest, idx) => (
                            <div key={idx} className="about-interest-item">
                                <span className="about-interest-icon">✦</span>
                                <span>{interest}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
