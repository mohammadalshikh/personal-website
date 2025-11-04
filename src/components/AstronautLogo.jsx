/**
 * AstronautLogo Component - Serves as the website's logo
 */
const AstronautLogo = ({ size = 100, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Helmet outer shell */}
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
            />

            {/* Visor */}
            <ellipse
                cx="50"
                cy="48"
                rx="28"
                ry="22"
                stroke="white"
                strokeWidth="2"
                fill="none"
            />

            {/* Visor inner reflection */}
            <ellipse
                cx="50"
                cy="46"
                rx="22"
                ry="16"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
            />

            {/* Helmet rim/neck piece */}
            <path
                d="M 25 80 Q 50 85 75 80"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
            />

            {/* Antenna */}
            <line
                x1="50"
                y1="10"
                x2="50"
                y2="3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle
                cx="50"
                cy="3"
                r="2.5"
                stroke="white"
                strokeWidth="2"
                fill="none"
            />

            {/* Left communication box */}
            <rect
                x="8"
                y="42"
                width="10"
                height="12"
                stroke="white"
                strokeWidth="2"
                fill="none"
                rx="1"
            />
            <line
                x1="10"
                y1="46"
                x2="16"
                y2="46"
                stroke="white"
                strokeWidth="1"
            />
            <line
                x1="10"
                y1="50"
                x2="16"
                y2="50"
                stroke="white"
                strokeWidth="1"
            />

            {/* Right communication box */}
            <rect
                x="82"
                y="42"
                width="10"
                height="12"
                stroke="white"
                strokeWidth="2"
                fill="none"
                rx="1"
            />
            <line
                x1="84"
                y1="46"
                x2="90"
                y2="46"
                stroke="white"
                strokeWidth="1"
            />
            <line
                x1="84"
                y1="50"
                x2="90"
                y2="50"
                stroke="white"
                strokeWidth="1"
            />

            {/* Reflection shine on visor */}
            <ellipse
                cx="38"
                cy="40"
                rx="8"
                ry="6"
                fill="white"
                opacity="0.3"
            />
        </svg>
    );
};

export default AstronautLogo;
