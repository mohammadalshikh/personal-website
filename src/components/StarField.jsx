import { useMemo } from 'react';

/**
 * StarField Component - Creates animated stars background
 * 
 * @param {number} starCount - Number of stars to generate (default: 200)
 * @param {boolean} animated - Whether stars should twinkle (default: true)
 */
const StarField = ({ starCount = 200, animated = true }) => {
    const stars = useMemo(() => {
        return Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            y: Math.random() * 100, // percentage
            size: Math.random() * 2 + 1, // 1-3px
            animationDelay: Math.random() * 2, // 0-2s delay
            animationDuration: Math.random() * 3 + 2, // 2-5s duration
        }));
    }, [starCount]);

    return (
        <div className="star-field">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={`star ${animated ? 'animate-twinkle' : ''}`}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.animationDelay}s`,
                        animationDuration: `${star.animationDuration}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default StarField;
