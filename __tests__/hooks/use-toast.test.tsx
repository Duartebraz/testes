import { renderHook, act } from '@testing-library/react'
import { useToast, reducer } from '@/hooks/use-toast'

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllTimers()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should add toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test Description'
      })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
    expect(result.current.toasts[0].description).toBe('Test Description')
  })

  it('should dismiss toast', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string

    act(() => {
      const toast = result.current.toast({
        title: 'Test Toast'
      })
      toastId = toast.id
    })

    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      result.current.dismiss(toastId)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })

  it('should limit number of toasts', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: 'Toast 1' })
      result.current.toast({ title: 'Toast 2' })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Toast 2')
  })
})

describe('toast reducer', () => {
  it('should add toast', () => {
    const initialState = { toasts: [] }
    const action = {
      type: 'ADD_TOAST' as const,
      toast: {
        id: '1',
        title: 'Test Toast',
        open: true
      }
    }

    const newState = reducer(initialState, action)

    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].title).toBe('Test Toast')
  })

  it('should update toast', () => {
    const initialState = {
      toasts: [{
        id: '1',
        title: 'Original Title',
        open: true
      }]
    }
    const action = {
      type: 'UPDATE_TOAST' as const,
      toast: {
        id: '1',
        title: 'Updated Title'
      }
    }

    const newState = reducer(initialState, action)

    expect(newState.toasts[0].title).toBe('Updated Title')
  })

  it('should remove toast', () => {
    const initialState = {
      toasts: [{
        id: '1',
        title: 'Test Toast',
        open: true
      }]
    }
    const action = {
      type: 'REMOVE_TOAST' as const,
      toastId: '1'
    }

    const newState = reducer(initialState, action)

    expect(newState.toasts).toHaveLength(0)
  })
})