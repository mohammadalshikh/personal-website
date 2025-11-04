/**
 * Planet Component - Represents a clickable destination/section
 * 
 * @param {string} id - Unique identifier (for future backend)
 * @param {string} name - Planet name
 * @param {string} color - Color theme (purple, blue, cyan, pink, orange)
 * @param {object} position - Position object (top/left/right/bottom)
 * @param {number} size - Size in pixels (default: 80)
 * @param {function} onClick - Click handler
 */
const Planet = ({
    id,
    name,
    color = 'purple',
    position,
    size = 80,
    onClick
}) => {
    // Planet texture patterns
    const getPlanetTexture = (color) => {
        const textures = {
            blue: (
                <svg width={size} height={size} className="absolute inset-0">
                    <defs>
                        <radialGradient id={`grad-blue-${id}`} cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                            <stop offset="40%" stopColor="#3b82f6" stopOpacity="1" />
                            <stop offset="70%" stopColor="#1d4ed8" stopOpacity="1" />
                            <stop offset="100%" stopColor="#0f1f4a" stopOpacity="1" />
                        </radialGradient>
                        <radialGradient id={`shadow-blue-${id}`} cx="70%" cy="50%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="40%" stopColor="rgba(0,0,0,0.2)" />
                            <stop offset="70%" stopColor="rgba(0,0,0,0.5)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
                        </radialGradient>
                        <radialGradient id={`highlight-blue-${id}`} cx="28%" cy="23%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                            <stop offset="30%" stopColor="rgba(255,255,255,0.25)" />
                            <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#grad-blue-${id})`} />
                    <ellipse cx={size * 0.25} cy={size * 0.35} rx={size * 0.15} ry={size * 0.12} fill="#1e3a8a" opacity="0.3" />
                    <ellipse cx={size * 0.6} cy={size * 0.45} rx={size * 0.18} ry={size * 0.14} fill="#1e40af" opacity="0.25" />
                    <ellipse cx={size * 0.4} cy={size * 0.65} rx={size * 0.12} ry={size * 0.1} fill="#1e3a8a" opacity="0.35" />
                    <path d={`M ${size * 0.52} ${size * 0.22} Q ${size * 0.58} ${size * 0.24} ${size * 0.62} ${size * 0.28} L ${size * 0.6} ${size * 0.35} Q ${size * 0.56} ${size * 0.38} ${size * 0.5} ${size * 0.36} Z`} fill="#166534" opacity="0.4" />
                    <ellipse cx={size * 0.28} cy={size * 0.48} rx={size * 0.08} ry={size * 0.11} fill="#15803d" opacity="0.35" />
                    <path d={`M ${size * 0.65} ${size * 0.55} L ${size * 0.72} ${size * 0.58} Q ${size * 0.74} ${size * 0.62} ${size * 0.7} ${size * 0.66} L ${size * 0.63} ${size * 0.64} Z`} fill="#166534" opacity="0.38" />
                    <ellipse cx={size * 0.35} cy={size * 0.3} rx={size * 0.12} ry={size * 0.08} fill="white" opacity="0.15" />
                    <ellipse cx={size * 0.55} cy={size * 0.5} rx={size * 0.15} ry={size * 0.1} fill="white" opacity="0.12" />
                    <ellipse cx={size * 0.42} cy={size * 0.7} rx={size * 0.1} ry={size * 0.07} fill="white" opacity="0.13" />
                    <circle cx={size / 2} cy={size / 2} r={size * 0.48} fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.15" />
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#shadow-blue-${id})`} />
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#highlight-blue-${id})`} />
                </svg>
            ),
            orange: (
                <svg width={size} height={size} className="absolute inset-0">
                    <defs>
                        <radialGradient id={`grad-orange-${id}`} cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#fb923c" stopOpacity="1" />
                            <stop offset="40%" stopColor="#ea580c" stopOpacity="1" />
                            <stop offset="70%" stopColor="#c2410c" stopOpacity="1" />
                            <stop offset="100%" stopColor="#431407" stopOpacity="1" />
                        </radialGradient>
                        <radialGradient id={`shadow-orange-${id}`} cx="70%" cy="50%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="40%" stopColor="rgba(0,0,0,0.25)" />
                            <stop offset="70%" stopColor="rgba(0,0,0,0.55)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.9)" />
                        </radialGradient>
                        <radialGradient id={`crater-orange-${id}`}>
                            <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#9a3412" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#c2410c" stopOpacity="0.2" />
                        </radialGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#grad-orange-${id})`} />
                    <circle cx={size * 0.32} cy={size * 0.28} r={size * 0.11} fill={`url(#crater-orange-${id})`} />
                    <circle cx={size * 0.31} cy={size * 0.27} r={size * 0.095} fill="#9a3412" opacity="0.5" />
                    <circle cx={size * 0.315} cy={size * 0.275} r={size * 0.08} fill="#b45309" opacity="0.3" />
                    <circle cx={size * 0.65} cy={size * 0.45} r={size * 0.09} fill={`url(#crater-orange-${id})`} />
                    <circle cx={size * 0.645} cy={size * 0.44} r={size * 0.075} fill="#9a3412" opacity="0.5" />
                    <circle cx={size * 0.48} cy={size * 0.68} r={size * 0.07} fill={`url(#crater-orange-${id})`} />
                    <circle cx={size * 0.24} cy={size * 0.55} r={size * 0.06} fill={`url(#crater-orange-${id})`} />
                    <circle cx={size * 0.72} cy={size * 0.68} r={size * 0.055} fill={`url(#crater-orange-${id})`} />
                    <ellipse cx={size * 0.4} cy={size * 0.42} rx={size * 0.14} ry={size * 0.11} fill="#b45309" opacity="0.25" />
                    <ellipse cx={size * 0.58} cy={size * 0.6} rx={size * 0.16} ry={size * 0.12} fill="#c2410c" opacity="0.2" />
                    <path d={`M ${size * 0.25} ${size * 0.7} Q ${size * 0.35} ${size * 0.73} ${size * 0.42} ${size * 0.7} Q ${size * 0.38} ${size * 0.76} ${size * 0.28} ${size * 0.78} Z`} fill="#9a3412" opacity="0.3" />
                    <ellipse cx={size * 0.55} cy={size * 0.32} rx={size * 0.09} ry={size * 0.07} fill="#ea580c" opacity="0.2" />
                    <ellipse cx={size * 0.35} cy={size * 0.58} rx={size * 0.11} ry={size * 0.08} fill="#dc2626" opacity="0.15" />
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#shadow-orange-${id})`} />
                    <ellipse cx={size * 0.32} cy={size * 0.3} rx={size * 0.13} ry={size * 0.16} fill="white" opacity="0.12" />
                </svg>
            ),
            purple: (
                <svg width={size} height={size} className="absolute inset-0">
                    <defs>
                        <radialGradient id={`grad-purple-${id}`} cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                            <stop offset="40%" stopColor="#7c3aed" stopOpacity="1" />
                            <stop offset="70%" stopColor="#5b21b6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#2e1065" stopOpacity="1" />
                        </radialGradient>
                        <radialGradient id={`shadow-purple-${id}`} cx="70%" cy="50%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="40%" stopColor="rgba(0,0,0,0.2)" />
                            <stop offset="70%" stopColor="rgba(0,0,0,0.5)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
                        </radialGradient>
                        <radialGradient id={`storm-purple-${id}`}>
                            <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#e9d5ff" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#grad-purple-${id})`} />
                    <ellipse cx={size * 0.5} cy={size * 0.28} rx={size * 0.42} ry={size * 0.055} fill="#6d28d9" opacity="0.4" transform={`rotate(-2 ${size * 0.5} ${size * 0.28})`} />
                    <ellipse cx={size * 0.5} cy={size * 0.38} rx={size * 0.44} ry={size * 0.06} fill="#7c3aed" opacity="0.35" transform={`rotate(1 ${size * 0.5} ${size * 0.38})`} />
                    <ellipse cx={size * 0.5} cy={size * 0.5} rx={size * 0.46} ry={size * 0.065} fill="#6d28d9" opacity="0.4" />
                    <ellipse cx={size * 0.5} cy={size * 0.62} rx={size * 0.44} ry={size * 0.06} fill="#5b21b6" opacity="0.38" transform={`rotate(-1 ${size * 0.5} ${size * 0.62})`} />
                    <ellipse cx={size * 0.5} cy={size * 0.72} rx={size * 0.4} ry={size * 0.055} fill="#4c1d95" opacity="0.35" transform={`rotate(2 ${size * 0.5} ${size * 0.72})`} />
                    <path d={`M ${size * 0.25} ${size * 0.38} Q ${size * 0.3} ${size * 0.36} ${size * 0.35} ${size * 0.38} Q ${size * 0.4} ${size * 0.4} ${size * 0.45} ${size * 0.38}`} stroke="#8b5cf6" strokeWidth="1.5" fill="none" opacity="0.3" />
                    <path d={`M ${size * 0.55} ${size * 0.5} Q ${size * 0.6} ${size * 0.48} ${size * 0.65} ${size * 0.5} Q ${size * 0.7} ${size * 0.52} ${size * 0.75} ${size * 0.5}`} stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.3" />
                    <ellipse cx={size * 0.42} cy={size * 0.5} rx={size * 0.14} ry={size * 0.1} fill={`url(#storm-purple-${id})`} />
                    <ellipse cx={size * 0.42} cy={size * 0.5} rx={size * 0.11} ry={size * 0.08} fill="#ddd6fe" opacity="0.3" />
                    <ellipse cx={size * 0.42} cy={size * 0.5} rx={size * 0.08} ry={size * 0.06} fill="#e9d5ff" opacity="0.35" />
                    <ellipse cx={size * 0.65} cy={size * 0.35} rx={size * 0.055} ry={size * 0.04} fill="#e9d5ff" opacity="0.3" />
                    <ellipse cx={size * 0.28} cy={size * 0.64} rx={size * 0.048} ry={size * 0.036} fill="#ddd6fe" opacity="0.28" />
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#shadow-purple-${id})`} />
                    <ellipse cx={size * 0.32} cy={size * 0.32} rx={size * 0.15} ry={size * 0.18} fill="white" opacity="0.18" />
                </svg>
            ),
            cyan: (
                <svg width={size} height={size} className="absolute inset-0">
                    <defs>
                        <radialGradient id={`grad-cyan-${id}`} cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#67e8f9" stopOpacity="1" />
                            <stop offset="40%" stopColor="#06b6d4" stopOpacity="1" />
                            <stop offset="70%" stopColor="#0e7490" stopOpacity="1" />
                            <stop offset="100%" stopColor="#083344" stopOpacity="1" />
                        </radialGradient>
                        <radialGradient id={`shadow-cyan-${id}`} cx="70%" cy="50%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="40%" stopColor="rgba(0,0,0,0.15)" />
                            <stop offset="70%" stopColor="rgba(0,0,0,0.45)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.8)" />
                        </radialGradient>
                        <radialGradient id={`spec-cyan-${id}`} cx="28%" cy="25%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                            <stop offset="30%" stopColor="rgba(255,255,255,0.4)" />
                            <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#grad-cyan-${id})`} />
                    <ellipse cx={size * 0.5} cy={size * 0.15} rx={size * 0.28} ry={size * 0.12} fill="#e0f2fe" opacity="0.5" />
                    <ellipse cx={size * 0.5} cy={size * 0.14} rx={size * 0.22} ry={size * 0.09} fill="#f0f9ff" opacity="0.6" />
                    <ellipse cx={size * 0.5} cy={size * 0.13} rx={size * 0.16} ry={size * 0.07} fill="white" opacity="0.7" />
                    <ellipse cx={size * 0.5} cy={size * 0.85} rx={size * 0.26} ry={size * 0.1} fill="#e0f2fe" opacity="0.45" />
                    <ellipse cx={size * 0.5} cy={size * 0.86} rx={size * 0.2} ry={size * 0.08} fill="#f0f9ff" opacity="0.55" />
                    <path d={`M ${size * 0.28} ${size * 0.35} L ${size * 0.42} ${size * 0.52} L ${size * 0.38} ${size * 0.68}`} stroke="#e0f2fe" strokeWidth="1.5" opacity="0.4" fill="none" />
                    <path d={`M ${size * 0.58} ${size * 0.3} L ${size * 0.52} ${size * 0.48} L ${size * 0.6} ${size * 0.62}`} stroke="#cffafe" strokeWidth="1.2" opacity="0.35" fill="none" />
                    <path d={`M ${size * 0.72} ${size * 0.42} L ${size * 0.65} ${size * 0.56}`} stroke="#e0f2fe" strokeWidth="1" opacity="0.3" fill="none" />
                    <ellipse cx={size * 0.35} cy={size * 0.45} rx={size * 0.12} ry={size * 0.09} fill="#f0f9ff" opacity="0.3" />
                    <circle cx={size * 0.35} cy={size * 0.45} r={size * 0.04} fill="white" opacity="0.4" />
                    <circle cx={size * 0.32} cy={size * 0.43} r={size * 0.02} fill="white" opacity="0.5" />
                    <circle cx={size * 0.38} cy={size * 0.47} r={size * 0.025} fill="white" opacity="0.45" />
                    <ellipse cx={size * 0.62} cy={size * 0.58} rx={size * 0.1} ry={size * 0.08} fill="#e0f2fe" opacity="0.28" />
                    <circle cx={size * 0.62} cy={size * 0.58} r={size * 0.035} fill="white" opacity="0.4" />
                    <ellipse cx={size * 0.48} cy={size * 0.38} rx={size * 0.14} ry={size * 0.1} fill="#bae6fd" opacity="0.2" />
                    <ellipse cx={size * 0.55} cy={size * 0.7} rx={size * 0.13} ry={size * 0.09} fill="#bae6fd" opacity="0.18" />
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#shadow-cyan-${id})`} />
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#spec-cyan-${id})`} />
                </svg>
            ),
            pink: (
                <svg width={size} height={size} className="absolute inset-0">
                    <defs>
                        <radialGradient id={`grad-pink-${id}`} cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#f472b6" stopOpacity="1" />
                            <stop offset="40%" stopColor="#db2777" stopOpacity="1" />
                            <stop offset="70%" stopColor="#9f1239" stopOpacity="1" />
                            <stop offset="100%" stopColor="#500724" stopOpacity="1" />
                        </radialGradient>
                        <radialGradient id={`shadow-pink-${id}`} cx="70%" cy="50%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="40%" stopColor="rgba(0,0,0,0.2)" />
                            <stop offset="70%" stopColor="rgba(0,0,0,0.5)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
                        </radialGradient>
                        <radialGradient id={`glow-pink-${id}`}>
                            <stop offset="0%" stopColor="#fdf2f8" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#fce7f3" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#grad-pink-${id})`} />
                    <path d={`M ${size * 0.22} ${size * 0.3} Q ${size * 0.28} ${size * 0.26} ${size * 0.35} ${size * 0.28} Q ${size * 0.42} ${size * 0.3} ${size * 0.48} ${size * 0.26} Q ${size * 0.54} ${size * 0.22} ${size * 0.6} ${size * 0.24}`} stroke="#ec4899" strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round" />
                    <path d={`M ${size * 0.18} ${size * 0.48} Q ${size * 0.26} ${size * 0.46} ${size * 0.34} ${size * 0.5} Q ${size * 0.42} ${size * 0.54} ${size * 0.5} ${size * 0.52}`} stroke="#f9a8d4" strokeWidth="2.2" fill="none" opacity="0.3" strokeLinecap="round" />
                    <path d={`M ${size * 0.35} ${size * 0.65} Q ${size * 0.43} ${size * 0.63} ${size * 0.51} ${size * 0.67} Q ${size * 0.59} ${size * 0.71} ${size * 0.67} ${size * 0.69}`} stroke="#db2777" strokeWidth="2" fill="none" opacity="0.32" strokeLinecap="round" />
                    <ellipse cx={size * 0.38} cy={size * 0.42} rx={size * 0.13} ry={size * 0.1} fill="#be185d" opacity="0.35" />
                    <circle cx={size * 0.38} cy={size * 0.42} r={size * 0.08} fill="#9f1239" opacity="0.3" />
                    <circle cx={size * 0.38} cy={size * 0.42} r={size * 0.05} fill="#881337" opacity="0.4" />
                    <ellipse cx={size * 0.65} cy={size * 0.55} rx={size * 0.1} ry={size * 0.08} fill="#be185d" opacity="0.32" />
                    <circle cx={size * 0.65} cy={size * 0.55} r={size * 0.06} fill="#9f1239" opacity="0.35" />
                    <ellipse cx={size * 0.52} cy={size * 0.32} rx={size * 0.09} ry={size * 0.07} fill="#ec4899" opacity="0.25" />
                    <ellipse cx={size * 0.28} cy={size * 0.6} rx={size * 0.11} ry={size * 0.08} fill="#db2777" opacity="0.28" />
                    <circle cx={size * 0.4} cy={size * 0.28} r={size * 0.045} fill={`url(#glow-pink-${id})`} />
                    <circle cx={size * 0.4} cy={size * 0.28} r={size * 0.025} fill="#fdf2f8" opacity="0.9" />
                    <circle cx={size * 0.65} cy={size * 0.44} r={size * 0.038} fill={`url(#glow-pink-${id})`} />
                    <circle cx={size * 0.65} cy={size * 0.44} r={size * 0.02} fill="#fdf2f8" opacity="0.85" />
                    <circle cx={size * 0.28} cy={size * 0.52} r={size * 0.035} fill={`url(#glow-pink-${id})`} />
                    <circle cx={size * 0.28} cy={size * 0.52} r={size * 0.018} fill="#fdf2f8" opacity="0.8" />
                    <circle cx={size * 0.58} cy={size * 0.68} r={size * 0.032} fill={`url(#glow-pink-${id})`} />
                    <circle cx={size * 0.72} cy={size * 0.36} r={size * 0.028} fill={`url(#glow-pink-${id})`} />
                    <path d={`M ${size * 0.45} ${size * 0.58} Q ${size * 0.5} ${size * 0.56} ${size * 0.55} ${size * 0.6} L ${size * 0.52} ${size * 0.65} Q ${size * 0.48} ${size * 0.63} ${size * 0.45} ${size * 0.58} Z`} fill="#be185d" opacity="0.4" />
                    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#shadow-pink-${id})`} />
                    <ellipse cx={size * 0.34} cy={size * 0.32} rx={size * 0.14} ry={size * 0.17} fill="white" opacity="0.16" />
                </svg>
            ),
        };
        return textures[color] || textures.purple;
    };

    const glowColorMap = {
        purple: 'shadow-space-purple/50',
        blue: 'shadow-space-blue/50',
        cyan: 'shadow-space-cyan/50',
        pink: 'shadow-space-pink/50',
        orange: 'shadow-space-orange/50',
    };

    return (
        <div
            className="absolute"
            style={position}
        >
            <button
                onClick={() => onClick?.(id)}
                className="planet-button group"
                aria-label={`Open ${name} section`}
            >
                <div
                    className={`
            relative
            rounded-full 
            shadow-xl ${glowColorMap[color]}
            overflow-hidden
            group-hover:shadow-2xl
            transition-shadow duration-300
          `}
                    style={{ width: `${size}px`, height: `${size}px` }}
                >
                    {getPlanetTexture(color)}
                </div>

                <div className="planet-label">
                    <span className="label-text">
                        {name}
                    </span>
                </div>

                <div
                    className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            border-2 border-white
            rounded-full
            opacity-0 group-hover:opacity-100
            transition-all duration-500
            pointer-events-none
          `}
                    style={{
                        width: `${size + 20}px`,
                        height: `${size + 20}px`
                    }}
                />
            </button>
        </div>
    );
};

export default Planet;
