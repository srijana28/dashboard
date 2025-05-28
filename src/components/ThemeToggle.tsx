import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeStore } from '../stores/themeStore'

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore()
  
  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}