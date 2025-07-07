import { render, screen } from '@testing-library/react'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('renders label with text', () => {
    render(<Label>Username</Label>)
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  it('associates with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </>
    )
    
    const label = screen.getByText('Email')
    const input = screen.getByRole('textbox')
    
    expect(label).toHaveAttribute('for', 'email')
    expect(input).toHaveAttribute('id', 'email')
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Custom</Label>)
    expect(screen.getByText('Custom')).toHaveClass('custom-label')
  })
})