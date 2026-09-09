export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      },
      colors: {
        surface: '#0b0e14',
        'surface-2': '#10141d',
        'surface-3': '#161b27',
        panel: '#12151e',
        edge: '#232838',
        'edge-strong': '#2f3548',
        ink: '#f4f6fb',
        body: '#c7cede',
        muted: '#8890a4',
        faint: '#5a6272',
        accent: '#7c6bf5',
        'accent-strong': '#6152e0',
        accent2: '#a3e635',
        ok: '#34d399',
        err: '#f87171'
      },
      keyframes: {
        pulseDot: {
          '0%': { boxShadow: '0 0 0 0 rgba(163,230,53,0.45)' },
          '70%': { boxShadow: '0 0 0 6px rgba(163,230,53,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(163,230,53,0)' }
        }
      },
      animation: {
        'pulse-dot': 'pulseDot 2.2s infinite'
      }
    }
  },
  plugins: []
}
