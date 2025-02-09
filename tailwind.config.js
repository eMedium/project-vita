/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0d47a1',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Domyślna czcionka
        arabic: ['Noto Sans Arabic', 'sans-serif'], // Dla języka arabskiego
        korean: ['Noto Sans KR', 'sans-serif'], // Dla języka koreańskiego
        japanese: ['Noto Sans JP', 'sans-serif'], // Dla języka japońskiego
        chineseSimplified: ['Noto Sans SC', 'sans-serif'], // Dla chińskiego uproszczonego
        chineseTraditional: ['Noto Sans TC', 'sans-serif'], // Dla chińskiego tradycyjnego
      },
      boxShadow: {
        'cie-do-fram': '0px 4px 10px 0px rgba(0, 0, 0, 1)',
        'cien-do-obrazkow': '3px 9px 4.7px 0px rgba(0, 0, 0, 0.36)',
        'dwa': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'shadow': '0px 1.97px 1.97px 0px rgba(0, 0, 0, 1)',
        // Dodaj inne niestandardowe cienie, jeśli potrzebujesz
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0ea5e9",

          "primary-content": "#f3f4f6",

          "secondary": "#f1913c",

          "secondary-content": "#212e70",

          "accent": "#fbbf24",

          "accent-content": "#0c4a6e",

          "neutral": "#bae6fd",

          "neutral-content": "#4b5563",

          "base-100": "#ffffff",

          "base-200": "#d1d5db",

          "base-300": "#d1d5db",

          "base-content": "#111827",

          "info": "#0284c7",

          "info-content": "#f3f4f6",

          "success": "#4ade80",

          "success-content": "#0c4a6e",

          "warning": "#c8415b",

          "warning-content": "#f3f4f6",

          "error": "#ff0000",

          "error-content": "#f3f4f6",
        },
      },
    ],
  },
}

