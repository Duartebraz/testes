import { render, screen } from '@testing-library/react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

describe('Alert', () => {
  it('renders alert with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    )

    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert Description')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(
      <Alert variant="destructive">
        <AlertDescription>Error message</AlertDescription>
      </Alert>
    )

    const alert = screen.getByText('Error message').parentElement
    expect(alert).toHaveClass('border-destructive/50')
  })
})