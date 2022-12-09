import type { PluginCreator } from 'tailwindcss/types/config'

export const plugin: PluginCreator = ({ theme, matchUtilities }) => {
  matchUtilities({ grid: (grid) => ({ grid }) }, { values: theme('grids') })
  matchUtilities({ 'grid-area': (gridArea) => ({ gridArea }) }, { values: theme('gridArea') })
}
