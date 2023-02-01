import { logStep } from './cli'
import { readVscTheme, type VscTheme } from './vsc'
import { BASE_WARP_THEME, writeWarpTheme } from './warp'

export async function convertVscTheme(vscThemePath: string) {
  const vscTheme = await readVscTheme(vscThemePath)

  logStep(`Converting theme '${vscTheme.name}'`)

  const warpTheme = structuredClone(BASE_WARP_THEME)

  warpTheme.accent = getVscThemeColor(vscTheme, 'button.background')
  warpTheme.background = getVscThemeColor(vscTheme, 'editor.background')
  warpTheme.details = vscTheme.base === 'vs-dark' ? 'darker' : 'lighter'
  warpTheme.foreground = getVscThemeColor(vscTheme, 'terminal.foreground')

  warpTheme.terminal_colors.bright.black = getVscThemeColor(vscTheme, 'terminal.ansiBlack')
  warpTheme.terminal_colors.bright.blue = getVscThemeColor(vscTheme, 'terminal.ansiBlue')
  warpTheme.terminal_colors.bright.cyan = getVscThemeColor(vscTheme, 'terminal.ansiCyan')
  warpTheme.terminal_colors.bright.green = getVscThemeColor(vscTheme, 'terminal.ansiGreen')
  warpTheme.terminal_colors.bright.magenta = getVscThemeColor(vscTheme, 'terminal.ansiMagenta')
  warpTheme.terminal_colors.bright.red = getVscThemeColor(vscTheme, 'terminal.ansiRed')
  warpTheme.terminal_colors.bright.white = getVscThemeColor(vscTheme, 'terminal.ansiWhite')
  warpTheme.terminal_colors.bright.yellow = getVscThemeColor(vscTheme, 'terminal.ansiYellow')

  warpTheme.terminal_colors.normal.black = getVscThemeColor(vscTheme, 'terminal.ansiBrightBlack')
  warpTheme.terminal_colors.normal.blue = getVscThemeColor(vscTheme, 'terminal.ansiBrightBlue')
  warpTheme.terminal_colors.normal.cyan = getVscThemeColor(vscTheme, 'terminal.ansiBrightCyan')
  warpTheme.terminal_colors.normal.green = getVscThemeColor(vscTheme, 'terminal.ansiBrightGreen')
  warpTheme.terminal_colors.normal.magenta = getVscThemeColor(vscTheme, 'terminal.ansiBrightMagenta')
  warpTheme.terminal_colors.normal.red = getVscThemeColor(vscTheme, 'terminal.ansiBrightRed')
  warpTheme.terminal_colors.normal.white = getVscThemeColor(vscTheme, 'terminal.ansiBrightWhite')
  warpTheme.terminal_colors.normal.yellow = getVscThemeColor(vscTheme, 'terminal.ansiBrightYellow')

  return writeWarpTheme(warpTheme, `themes/${vscTheme.name}.yaml`)
}

function getVscThemeColor(vscTheme: VscTheme, vscColorName: string) {
  const vscColor = vscTheme.colors[vscColorName]

  if (!vscColor) {
    throw new Error(`Could not find color with the '${vscColorName}' identifier.`)
  }

  // Warp themes do not support alpha values.
  return vscColor.slice(0, 7)
}
