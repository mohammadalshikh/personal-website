/**
 * About Component - Displays personal information
 *
 * @param {Object} about - { intro, skills, interests }
 */
const About = ({ about = {} }) => {
    const { intro = '', skills = [], interests = [] } = about;

    return (
        <div className="h-full flex flex-col space-y-4 md:space-y-6">
            {/* Intro */}
            {intro && (
                <div className="card flex-shrink-0">
                    <h3 className="text-lg md:text-xl font-bold text-space-orange mb-2 md:mb-3">
                        Welcome! 👋
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {intro}
                    </p>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div className="card flex-shrink-0">
                    <h3 className="text-lg md:text-xl font-bold text-space-cyan mb-2 md:mb-3">
                        Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {skills.map((skill, idx) => (
                            <span key={idx} className="tech-tag text-xs md:text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Interests */}
            {interests.length > 0 && (
                <div className="card flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-space-pink mb-2 md:mb-3">
                        Interests & Hobbies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {interests.map((interest, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                                <span className="text-space-pink">✦</span>
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
