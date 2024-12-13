import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        schoolSky: "#C8ebfa",
        schoolSkyLight: "#edf9fd",
        schoolPurple: "#cfceff",
        schoolPurpleLight: "#f2f0ff",
        schoolYellow: "#fae27c",
        schoolYellowLight: "#fefce8",
      },
    },
  },
  plugins: [],
} satisfies Config;
