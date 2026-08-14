import { Alert, AlertTitle, Button } from '@mui/material'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={onRetry}>
          Retry
        </Button>
      }
    >
      <AlertTitle>Failed to load training schedule</AlertTitle>
      {message}
    </Alert>
  )
}