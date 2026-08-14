import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
})