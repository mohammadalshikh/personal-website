// Editable about - no hooks required
/**
 * EditableAbout - Edit mode version of About component
 * Props:
 *  - about: { intro, skills, interests, avatar }
 *  - onChange: function(newAbout)
 */
const EditableAbout = ({ about = {}, onChange }) => {
    const { intro = '', skills = [], interests = [] } = about;

    // Local copies of array-like fields as strings while editing
    const skillsValue = Array.isArray(skills) ? skills.join(',') : skills || '';
    const interestsValue = Array.isArray(interests) ? interests.join(',') : interests || '';

    const handleFieldChange = (field, value) => {
        onChange({ ...about, [field]: value });
    };

    const handleArrayChange = (field, value) => {
        // store raw string while editing
        onChange({ ...about, [field]: value });
    };

    const handleArrayBlur = (field, value) => {
        // parse into array on blur
        if (typeof value === 'string') {
            const array = value.split(',').map((item) => item.trim()).filter((item) => item);
            onChange({ ...about, [field]: array });
        }
    };

    return (
        <div className="h-full flex flex-col space-y-4 md:space-y-6 pl-8">
            <div className="card">
                <h3 className="text-lg md:text-xl font-bold text-space-orange mb-2 md:mb-3">Welcome! 👋</h3>
                <textarea
                    value={intro}
                    onChange={(e) => handleFieldChange('intro', e.target.value)}
                    className="edit-input text-gray-300 leading-relaxed text-sm md:text-base bg-transparent border border-gray-600 focus:border-gray-400 rounded p-2 w-full resize-none"
                    rows={6}
                    placeholder="Write a short intro about yourself..."
                />
            </div>

            <div className="card">
                <h3 className="text-lg md:text-xl font-bold text-space-cyan mb-2 md:mb-3">Skills & Technologies</h3>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={skillsValue}
                        onChange={(e) => handleArrayChange('skills', e.target.value)}
                        onBlur={(e) => handleArrayBlur('skills', e.target.value)}
                        className="edit-input text-sm text-gray-300 bg-transparent border border-gray-600 focus:border-gray-400 rounded p-2 w-full"
                        placeholder="Python, React, Java"
                    />
                </div>

                {Array.isArray(about.skills) && about.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {about.skills.map((s, i) => (
                            <span key={i} className="tech-tag">{s}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="card flex-1">
                <h3 className="text-lg md:text-xl font-bold text-space-pink mb-2 md:mb-3">Interests & Hobbies</h3>
                <input
                    type="text"
                    value={interestsValue}
                    onChange={(e) => handleArrayChange('interests', e.target.value)}
                    onBlur={(e) => handleArrayBlur('interests', e.target.value)}
                    className="edit-input text-sm text-gray-300 bg-transparent border border-gray-600 focus:border-gray-400 rounded p-2 w-full"
                    placeholder="Movies, Gaming, Hiking"
                />

                {Array.isArray(about.interests) && about.interests.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        {about.interests.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                                <span className="text-space-pink">✦</span>
                                <span>{it}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`\n                .edit-input { outline: none; transition: border-color 0.2s; }\n                .edit-input::placeholder { color: #6b7280; }\n            `}</style>
        </div>
    );
};

export default EditableAbout;
