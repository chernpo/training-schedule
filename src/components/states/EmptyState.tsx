import { Typography, Button, Paper } from '@mui/material'

interface EmptyStateProps {
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export function EmptyState({ hasActiveFilters, onClearFilters }: EmptyStateProps) {
  return (
    <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        {hasActiveFilters ? 'No lessons match your filters' : 'No training lessons scheduled'}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: hasActiveFilters ? 2 : 0 }}>
        {hasActiveFilters
          ? 'Try adjusting or clearing your filters to see more results.'
          : 'Once lessons are scheduled, they will appear here.'}
      </Typography>
      {hasActiveFilters && (
        <Button variant="outlined" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </Paper>
  )
}