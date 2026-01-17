/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        sans: ['"Patrick Hand"', 'cursive'], // Defaulting sans to Patrick Hand for the vibe
      },
      colors: {
        paper: '#ffffff',
        'pencil': '#374151', // Gray-700
        'marker-yellow': '#fef08a', // Yellow-200
        'marker-pink': '#fbcfe8', // Pink-200
        'marker-blue': '#bae6fd', // Blue-200
      },
      backgroundImage: {
        'graph-paper': "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
      },
      backgroundSize: {
        'graph': '20px 20px',
      },
      boxShadow: {
        'sketch': '2px 3px 0px 0px rgba(55, 65, 81, 0.2)',
        'tape': '0 1px 2px rgba(0,0,0,0.1)',
      },
      rotate: {
        'slight-1': '1deg',
        'slight-n1': '-1deg',
        'slight-2': '2deg',
        'slight-n2': '-2deg',
      }
    },
  },
  plugins: [],
}
