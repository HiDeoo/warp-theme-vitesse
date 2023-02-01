import fs from 'node:fs/promises'

import { stringify } from 'yaml'

export const BASE_WARP_THEME = {
  accent: '#ffffff',
  background: '#ffffff',
  details: 'darker',
  foreground: '#ffffff',
  terminal_colors: {
    bright: {
      black: '#ffffff',
      blue: '#ffffff',
      cyan: '#ffffff',
      green: '#ffffff',
      magenta: '#ffffff',
      red: '#ffffff',
      white: '#ffffff',
      yellow: '#ffffff',
    },
    normal: {
      black: '#ffffff',
      blue: '#ffffff',
      cyan: '#ffffff',
      green: '#ffffff',
      magenta: '#ffffff',
      red: '#ffffff',
      white: '#ffffff',
      yellow: '#ffffff',
    },
  },
}

export function writeWarpTheme(theme: WarpTheme, themePath: string) {
  return fs.writeFile(themePath, warpThemeToYaml(theme))
}

function warpThemeToYaml(warpTheme: WarpTheme) {
  return stringify(warpTheme)
}

type WarpTheme = typeof BASE_WARP_THEME
