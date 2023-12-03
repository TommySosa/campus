/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'elf-green': {
          '50': '#effefc',
          '100': '#c8fff7',
          '200': '#92fdf0',
          '300': '#53f5e9',
          '400': '#20e1d8',
          '500': '#07c5bf',
          '600': '#029f9d',
          '700': '#078080', //
          '800': '#0b6364',
          '900': '#0e5353',
          '950': '#012f32',
        },
        'carnation': {
          '50': '#fef3f2',
          '100': '#ffe5e1',
          '200': '#ffd0c9',
          '300': '#feaea3',
          '400': '#fc7e6d',
          '500': '#f45d48', //
          '600': '#e13821',
          '700': '#bd2c18',
          '800': '#9c2818',
          '900': '#82271a',
          '950': '#471008',
        },
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" }
      },
      extend: {
        fontSize: {
          sm: '0.875rem', // ejemplo de tamaño de fuente pequeño
          base: '1rem',   // tamaño de fuente base
          lg: '1.125rem', // ejemplo de tamaño de fuente grande
        },
      },
    }
  },
  plugins: [],
}
