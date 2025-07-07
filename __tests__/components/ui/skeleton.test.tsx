import { render } from '@testing-library/react'
import { Skeleton } from '@/components/ui/skeleton'

describe('Skeleton', () => {
  it('renders with default classes', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-4 w-32" />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveClass('h-4', 'w-32')
  })
})