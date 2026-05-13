/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                sans: ['DM Sans', 'sans-serif'],
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(135deg, #0D9488 0%, #F59E0B 100%)',
                'card-gradient': 'linear-gradient(160deg, #1E293B 0%, #0F172A 100%)',
                'card-overlay': 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 40%)',
            },
            colors: {
                teal: {
                    300: '#2DD4BF',
                    400: '#14B8A6',
                    600: '#0D9488',
                },
                amber: {
                    400: '#F59E0B',
                    500: '#D97706',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
