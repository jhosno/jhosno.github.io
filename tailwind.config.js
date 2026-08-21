/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.{html,md}',
    './_layouts/**/*.{html,md}',
    './_posts/**/*.{html,md}',
    './_posts/*.{html,md}',
    './_projects/**/*.{html,md}',
    './_projects/*.{html,md}',
    './_cases/**/*.{html,md}',
    './_cases/*.{html,md}',
    './*.{html,md}',
  ],
  theme: {
    extend: {
      colors: {
        /* Legacy palette (kept for existing posts/projects) */
        golden: "#ff8e80",
        purple: "#8B5CF6",
        salmon: "#c53a9d",
        /* New portfolio palette */
        bg: "#1a1a1a",
        ink: "#C53A9D",
        acid: "#5a2bc7",
        "ink-hi": "#E86BBE",
        "ink-dim": "#7d2764",
        "acid-hi": "#B9BE2A",
        "acid-dim": "#4a4c0d",
        paper: "#f2f0d8",
      },
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        display: ["Syne", "system-ui", "sans-serif"],
        mono: ["Martian Mono", "ui-monospace", "monospace"],
        body: ["Instrument Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}