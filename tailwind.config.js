/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.{html,md}',
    './_layouts/**/*.{html,md}',
    './_posts/**/*.{html,md}',
    './_posts/*.{html,md}',
    './_projects/**/*.{html,md}',
    './_projects/*.{html,md}',
    './*.{html,md}',
  ],
  theme: {
    extend: {
      colors: {
        /* golden: "#FBBF24", */
        golden: "#f6b931",
        /* purple: "#8B5CF6", */
        purple: "#8B5CF6",
        /* salmon: "#F19593 ", */
        salmon: "#A6357D ",
      },
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}