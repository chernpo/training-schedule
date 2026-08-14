import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TrainingSchedulePage } from './pages/TrainingSchedulePage'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <TrainingSchedulePage />
    </LocalizationProvider>
  )
}

export default App