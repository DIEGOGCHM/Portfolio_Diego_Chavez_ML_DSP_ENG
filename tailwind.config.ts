import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black_core: "var(--black_core)",
        black_layer: "var(--black_layer)",
        gray_interference: "var(--gray_interference)",
        gray_signal: "var(--gray_signal)",
        white_clinical: "var(--white_clinical)",
        white_faded: "var(--white_faded)",
        green_signal: "var(--green_signal)",
        amber_decay: "var(--amber_decay)",
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        none: "none",
      },
    },
  },
  plugins: [],
};
export default config;
