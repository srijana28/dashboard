import { create } from 'zustand'
import { createTheme } from '@mui/material'

interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
  theme: ReturnType<typeof createTheme>
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  theme: createTheme({
    palette: {
      mode: 'light',
    },
  }),
  toggleTheme: () => set((state) => {
    const isDarkMode = !state.isDarkMode
    return {
      isDarkMode,
      theme: createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      })
    }
  }),
})) 