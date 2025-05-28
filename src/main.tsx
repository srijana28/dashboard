import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useThemeStore } from './stores/themeStore'

function Root() {
  const theme = useThemeStore(state => state.theme)
  
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />)