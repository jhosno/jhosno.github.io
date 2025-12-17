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
        /* Palette - Lave GB -> https://lospec.com/palette-list/lava-gb */
        golden: "#ff8e80",
        purple: "#8B5CF6",
        salmon: "#c53a9d ",
      },
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}