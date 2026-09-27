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
        surface: '#09090b',
        'surface-2': '#0e0e11',
        'surface-3': '#151518',
        panel: '#0f0f12',
        edge: '#1e1e23',
        'edge-strong': '#2c2c33',
        ink: '#fafafa',
        body: '#b8b8c1',
        muted: '#85858f',
        faint: '#55555e',
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
