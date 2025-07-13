import { renderHook } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('useMobile', () => {
  it('returns false for desktop', () => {
    const { result } = renderHook(() => useMobile())
    expect(result.current).toBe(false)
  })

  it('returns true for mobile when matchMedia matches', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }))

    const { result } = renderHook(() => useMobile())
    expect(result.current).toBe(true)
  })
})