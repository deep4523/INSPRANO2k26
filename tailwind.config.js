/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        foreground: "#f8fafc",
        cyber: {
          blue: "#00d2ff",
          cyan: "#00f0ff",
          dark: "#050b14",
          card: "rgba(10, 19, 36, 0.75)",
          border: "rgba(0, 210, 255, 0.25)",
          glow: "rgba(0, 240, 255, 0.4)",
          red: "#ff1e42",
          redGlow: "rgba(255, 30, 66, 0.5)",
          gold: "#f59e0b",
          steel: "#94a3b8",
        },
      },
      fontFamily: {
        mech: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(0, 210, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 210, 255, 0.05) 1px, transparent 1px)',
        'mech-lines': 'repeating-linear-gradient(45deg, rgba(0, 210, 255, 0.03), rgba(0, 210, 255, 0.03) 10px, transparent 10px, transparent 20px)',
      },
      boxShadow: {
        'cyber-cyan': '0 0 20px -5px rgba(0, 240, 255, 0.5)',
        'cyber-blue': '0 0 25px -5px rgba(0, 114, 255, 0.6)',
        'cyber-red': '0 0 25px -5px rgba(255, 30, 66, 0.6)',
        'cyber-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(0, 210, 255, 0.2)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.8))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
