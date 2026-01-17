/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pass-bg": "var(--pass-bg)",
        "pass-surface": "var(--pass-surface)",
        "pass-foreground": "var(--pass-foreground)",
        "pass-muted": "var(--pass-muted)",
        "pass-border": "var(--pass-border)",
        "pass-primary": {
          DEFAULT: "var(--pass-primary)",
          dark: "var(--pass-primary-dark)",
        },
        "pass-accent": "var(--pass-accent)",
        "pass-success": "var(--pass-success)",
        "pass-warning": "var(--pass-warning)",
        "pass-error": "var(--pass-error)",
      },
    },
  },
  plugins: [],
};
