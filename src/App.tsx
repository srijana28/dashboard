import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import ChartPanel from './components/ChartPanel/ChartPanel'
import TablePanel from './components/TablePanel/TablePanel'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          CtrlB Dashboard
        </Typography>
        <ThemeToggle />
      </Stack>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <ChartPanel />
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <TablePanel />
        </Paper>
      </Box>
    </Container>
  )
}

export default App