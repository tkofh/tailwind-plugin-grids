/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    grid: {
      'auto-fluid': '"auto fluid" 1fr / auto minmax(0, 1fr)'
    },
    gridArea: {
      auto: 'auto',
      fluid: 'fluid'
    }
  },
  plugins: [
    require('../dist/index.cjs'),
  ],
}
