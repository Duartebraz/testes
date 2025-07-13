import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/contexts/auth-context'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const TestComponent = () => {
  const { user, isLoading, login, logout, isAuthenticated } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      <div data-testid="user">{user ? user.name : 'No User'}</div>
      <button onClick={() => login('admin@dashboard.com', '123456')} data-testid="login-btn">
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  )
}

const renderAuthProvider = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('starts with loading state', () => {
    renderAuthProvider()
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading')
  })

  it('loads user from localStorage on mount', async () => {
    const savedUser = JSON.stringify({
      id: '1',
      name: 'Test User',
      email: 'test@test.com'
    })
    localStorageMock.getItem.mockReturnValue(savedUser)

    renderAuthProvider()

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User')
      expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated')
    })
  })

  it('handles successful login', async () => {
    renderAuthProvider()

    fireEvent.click(screen.getByTestId('login-btn'))

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Administrador')
      expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated')
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })
  })

  it('handles logout', async () => {
    renderAuthProvider()

    // Login first
    fireEvent.click(screen.getByTestId('login-btn'))
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated')
    })

    // Then logout
    fireEvent.click(screen.getByTestId('logout-btn'))

    expect(screen.getByTestId('user')).toHaveTextContent('No User')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('Not Authenticated')
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('dashboard-user')
  })
})