/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    colors: {
      transparent: 'transparent', current: 'currentColor', white: '#fff', black: '#000',
      base: '#080b0a', elev: '#0c1210', surf: '#111917', surfh: '#16211e',
      t1: '#f0f4f2', t2: '#b8c5c1', t3: '#7d8a86', t4: '#4a5250',
      brand: { DEFAULT: '#10d695', dim: '#0a8f6a' },
      indigo: '#8b9eff', amber: '#ffb84d', rose: '#ff7b9c',
      line: { DEFAULT: 'rgba(255,255,255,0.10)', subtle: 'rgba(255,255,255,0.06)', strong: 'rgba(255,255,255,0.14)', brand: 'rgba(16,214,149,0.35)' },
    },
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
    },
  },
};
