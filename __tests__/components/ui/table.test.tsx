import { render, screen } from '@testing-library/react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

describe('Table', () => {
  it('renders table with content', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
            <TableCell>25</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Table className="custom-table">Content</Table>)
    const table = screen.getByText('Content').parentElement
    expect(table).toHaveClass('custom-table')
  })
})