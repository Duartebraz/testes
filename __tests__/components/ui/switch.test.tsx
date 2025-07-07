import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '@/components/ui/switch'

describe('Switch', () => {
  it('renders switch', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const user = userEvent.setup()
    render(<Switch />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).not.toBeChecked()
    
    await user.click(switchElement)
    expect(switchElement).toBeChecked()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Switch disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})