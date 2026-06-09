/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.38vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 0.95rem + 0.88vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1rem + 1.25vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.1rem + 2vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.2rem + 3.38vw, 3rem)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'neu-flat': '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
        'neu-pressed': 'inset 6px 6px 12px #d1d5db, inset -6px -6px 12px #ffffff',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
      "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", 
      "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", 
      "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", 
      "night", "coffee", "winter", "dim", "nord", "sunset"
    ],
    base: true,
    styled: true,
    utils: true,
  },
}
