import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '@/components/ui/textarea'

describe('Textarea', () => {
  it('renders textarea', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Textarea placeholder="Type here" />)
    
    const textarea = screen.getByPlaceholderText('Type here')
    await user.type(textarea, 'Hello World')
    
    expect(textarea).toHaveValue('Hello World')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />)
    expect(screen.getByPlaceholderText('Disabled textarea')).toBeDisabled()
  })
})