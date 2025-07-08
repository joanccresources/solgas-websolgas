import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";
export default {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px", // Pantalla pequeña
      md: "768px", // Pantalla mediana
      lg: "1024px", // Pantalla grande
      xl: "1280px", // Pantalla extra grande
      "2xl": "1536px", // Pantalla extra extra grande
      banner: {
        // Pantalla personalizada llamada "banner"
        max: "1399px", // Se activa cuando el ancho es menor a 1400px
      },
    },
    extend: {
      height: {
        home: '657px',
        'general-purpose': '584px',
        glp: '522px',
        promotions: '530px',
        distributor: '590px'
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        header: "#212A5C",
        "header-two-1": "#203386",
        "header-two-2": "#0B1330",
        "header-two-transparent": "rgba(33, 42, 92, 0.59)",
        "primary-orange": "#FF7900",
        "primary-blue": "#0B2265",
        "primary-blue-light": "#005BBB",
        "secondary-blue": "#3C4E84",
        "light-blue": "#2C6AA9",
        gray: "#E7E9F0",
        "gray-secondary": "#D5D5D5",
        "gray-bold": "#4C4C4C",
        "gray-light": "#f3f4f6",
        "gray-card": "#7D7D7D",
        "white-select": "#F4F4F4",
        "gray-input": "#D9D9D9",
        black: "#2B2D33",
        select: "#9DA7C1",
        "light-green": "#6BE520",
        "border-history": "#DDE1E9",
        green: "#3D9706",
        simulator: "#EFF1F8",
        mobile: "#485A8B",
        "user-comment": "#F7F7F7",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      screens: {
        lg2: "1440px",
      },
      fontFamily: {
        "clan-pro-regular": ["clan-pro-regular", "sans-serif"],
        "clan-pro-medium": ["clan-pro-medium", "sans-serif"],
        "clan-pro-bold": ["clan-pro-bold", "sans-serif"],
        "clan-pro-thin": ["clan-pro-thin", "sans-serif"],
        "clan-pro-italic": ["clan-pro-italic", "sans-serif"],
        "clan-pro-bold-italic": ["clan-pro-bold-italic", "sans-serif"],
        "clan-pro-new": ["clan-pro-new", "sans-serif"],
        "clan-pro-medium-italic": [" clan-pro-medium-italic", "sans-serif"],
        "clan-pro-black": [" clan-pro-black", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDelay: {
        "400": "400ms",
      },
    },
  },
  plugins: [tailwindcssAnimated],
} satisfies Config;
