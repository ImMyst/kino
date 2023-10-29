import type { Config } from "tailwindcss";

const config = {
  content: ["app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
