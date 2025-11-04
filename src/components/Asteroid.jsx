/**
 * Asteroid Component
 * 
 * @param {number} size - Size in pixels
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 */
const Asteroid = ({ size = 60, className = "", onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`group relative ${className}`}
            style={{ width: `${size}px`, height: `${size}px` }}
            aria-label="Admin access"
        >
            {/* White circle hover effect */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                    width: `${size + 20}px`,
                    height: `${size + 20}px`
                }}
            />

            <svg
                width={size}
                height={size}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-110"
            >
                {/* Main asteroid body */}
                <path
                    d="M32 4 L44 10 L52 18 L58 28 L60 40 L54 50 L44 58 L32 60 L20 56 L10 48 L6 38 L4 26 L8 16 L18 8 Z"
                    fill="#4b5563"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Inner shadow/depth */}
                <path
                    d="M32 10 L40 14 L46 20 L50 28 L52 38 L48 46 L40 52 L32 54 L24 50 L16 44 L12 36 L10 26 L14 18 L22 12 Z"
                    fill="#374151"
                    opacity="0.8"
                />

                {/* Craters - small */}
                <circle cx="38" cy="22" r="4" fill="#1f2937" opacity="0.6" />
                <circle cx="38" cy="22" r="3" fill="#111827" opacity="0.4" />

                <circle cx="24" cy="28" r="3.5" fill="#1f2937" opacity="0.6" />
                <circle cx="24" cy="28" r="2.5" fill="#111827" opacity="0.4" />

                <circle cx="42" cy="42" r="3" fill="#1f2937" opacity="0.6" />
                <circle cx="42" cy="42" r="2" fill="#111827" opacity="0.4" />

                <circle cx="18" cy="44" r="2.5" fill="#1f2937" opacity="0.6" />
                <circle cx="18" cy="44" r="1.5" fill="#111827" opacity="0.4" />

                {/* Surface texture */}
                <path
                    d="M 20 16 L 28 18"
                    stroke="#6b7280"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeLinecap="round"
                />
                <path
                    d="M 36 30 L 44 32"
                    stroke="#6b7280"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeLinecap="round"
                />
                <path
                    d="M 18 36 L 24 38"
                    stroke="#6b7280"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeLinecap="round"
                />
                <path
                    d="M 40 48 L 46 50"
                    stroke="#6b7280"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeLinecap="round"
                />

                {/* Subtle highlights on edges */}
                <path
                    d="M 32 6 L 42 11 L 50 19"
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                    opacity="0.2"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Metallic glints */}
                <circle cx="28" cy="20" r="1.5" fill="#d1d5db" opacity="0.4" />
                <circle cx="46" cy="36" r="1" fill="#d1d5db" opacity="0.3" />
                <circle cx="22" cy="50" r="1.2" fill="#d1d5db" opacity="0.35" />
            </svg>
        </button>
    );
};

export default Asteroid;
