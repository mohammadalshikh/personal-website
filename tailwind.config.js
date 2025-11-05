/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    dark: '#0a0e27',
                    darker: '#050810',
                    purple: '#6366f1',
                    blue: '#3b82f6',
                    cyan: '#06b6d4',
                    pink: '#ec4899',
                    orange: '#f97316',
                },
            },
            fontFamily: {
                'game': ['"Press Start 2P"', 'cursive'],
                'space': ['"Orbitron"', 'sans-serif'],
            },
            fontWeight: {
                normal: '500',
                semibold: '600',
                bold: '700',
            },
            animation: {
                'twinkle': 'twinkle 2s ease-in-out infinite',
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-up': 'slide-up 0.4s ease-out',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.3' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
