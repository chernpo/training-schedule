import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TrainingSchedulePage } from './pages/TrainingSchedulePage'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <TrainingSchedulePage />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App