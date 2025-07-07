import { render } from '@testing-library/react'
import { Progress } from '@/components/ui/progress'

describe('Progress', () => {
  it('renders progress bar', () => {
    const { container } = render(<Progress value={50} />)
    const progress = container.querySelector('[role="progressbar"]')
    expect(progress).toBeInTheDocument()
  })

  it('sets correct value', () => {
    const { container } = render(<Progress value={75} />)
    const progress = container.querySelector('[role="progressbar"]')
    expect(progress).toHaveAttribute('aria-valuenow', '75')
  })

  it('applies custom className', () => {
    const { container } = render(<Progress value={50} className="custom-progress" />)
    const progress = container.firstChild
    expect(progress).toHaveClass('custom-progress')
  })
})