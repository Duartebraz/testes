import { render } from '@testing-library/react'
import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  it('renders horizontal separator by default', () => {
    const { container } = render(<Separator />)
    const separator = container.firstChild
    expect(separator).toHaveClass('h-[1px]', 'w-full')
  })

  it('renders vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const separator = container.firstChild
    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('applies custom className', () => {
    const { container } = render(<Separator className="my-4" />)
    const separator = container.firstChild
    expect(separator).toHaveClass('my-4')
  })
})