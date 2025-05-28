import { Box, Container, Paper, Stack, Typography, useTheme, Divider } from '@mui/material'
import ChartPanel from './components/ChartPanel/ChartPanel'
import TablePanel from './components/TablePanel/TablePanel'
import ThemeToggle from './components/ThemeToggle'
import { BarChart as ChartIcon } from '@mui/icons-material'

function App() {
  const theme = useTheme()

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.mode === 'dark' ? '#1a1a2e' : '#e8f4f8',
      py: 4
    }}>
      <Container maxWidth="xl">
        <Paper 
          elevation={theme.palette.mode === 'dark' ? 2 : 1}
          sx={{ 
            p: 3, 
            mb: 4,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #2C3E50 0%, #3B4F63 100%)'
              : 'linear-gradient(135deg, #F5F7FA 0%, #E3E8EF 100%)',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative elements */}
          <Box sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)'
              : 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 70%)',
          }} />
          
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ChartIcon 
                    sx={{ 
                      fontSize: 40,
                      color: theme.palette.mode === 'dark' ? '#B8C6D4' : '#475569'
                    }} 
                  />
                  <Typography 
                    variant="h4" 
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#334155',
                    }}
                  >
                    CtrlB Dashboard
                  </Typography>
                </Stack>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mt: 1,
                    color: theme.palette.mode === 'dark' ? '#94A3B8' : '#64748B',
                    maxWidth: 500
                  }}
                >
                  Interactive sales analytics and data visualization platform
                </Typography>
              </Box>
              <ThemeToggle />
            </Stack>
          </Stack>
        </Paper>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4 }}>
          <Paper 
            elevation={theme.palette.mode === 'dark' ? 2 : 1}
            sx={{ 
              p: 3,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, #1a1a2e 30%, #262640 90%)'
                : 'linear-gradient(45deg, #ffffff 30%, #f8f9fa 90%)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            <ChartPanel />
          </Paper>
          <Paper 
            elevation={theme.palette.mode === 'dark' ? 2 : 1}
            sx={{ 
              p: 3,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, #1a1a2e 30%, #262640 90%)'
                : 'linear-gradient(45deg, #ffffff 30%, #f8f9fa 90%)',
              borderRadius: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            <TablePanel />
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default App