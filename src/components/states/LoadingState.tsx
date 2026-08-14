import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const COLUMNS = 7
const ROWS = 6

export function LoadingState() {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <TableCell key={i}>
                <Skeleton width="60%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: COLUMNS }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}