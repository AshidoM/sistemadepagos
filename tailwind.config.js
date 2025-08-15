/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        segoe: [
          "Segoe UI",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Windows 11 inspired colors
        "win-bg": "#f3f3f3",
        "win-surface": "#ffffff",
        "win-surface-secondary": "#fafafa",
        "win-border": "#e5e5e5",
        "win-text": "#323130",
        "win-text-secondary": "#605e5c",
        "win-accent": "#0078d4",
        "win-accent-hover": "#106ebe",
        "win-accent-light": "#deecf9",
        "win-success": "#107c10",
        "win-warning": "#ff8c00",
        "win-error": "#d13438",
        "win-sidebar": "#f8f8f8",
        "win-sidebar-hover": "#f0f0f0",
        "win-sidebar-active": "#e3f2fd",
        // BACI brand colors
        "baci-dark": "#1a1b23",
        "baci-darker": "#0f1015",
        "baci-yellow": "#f4c430",
        "baci-yellow-matte": "#d4a017",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        win: "4px",
        "win-lg": "8px",
      },
      boxShadow: {
        win: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "win-lg": "0 4px 8px rgba(0, 0, 0, 0.12)",
        "win-xl": "0 8px 16px rgba(0, 0, 0, 0.14)",
        "win-card": "0 1px 3px rgba(0, 0, 0, 0.1)",
        "win-elevated": "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(244, 196, 48, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(244, 196, 48, 0.6)" },
        },
        "loading-dots": {
          "0%, 20%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "80%, 100%": { transform: "scale(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "loading-dots": "loading-dots 1.4s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "scale-in": "scale-in 0.15s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
