import type { PluginCreator } from './types'

export const plugin: PluginCreator = ({ theme, matchUtilities }) => {
  matchUtilities({ grid: (grid) => ({ grid }) }, { values: theme('grid') })
  matchUtilities({ 'grid-area': (gridArea) => ({ gridArea }) }, { values: theme('gridArea') })
}
