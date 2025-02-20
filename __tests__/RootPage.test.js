// __tests__/RootPage.test.js
import { render, screen, waitFor } from '@testing-library/react';
import RootPage from '@/pages/index';

// Mock the useUser context so we can control its value.
jest.mock('@/context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('RootPage', () => {
  beforeEach(() => {
    const { useUser } = require('@/context/UserContext');
    // Default: user not logged in.
    useUser.mockReturnValue({
      loggedIn: false,
      currentUser: null,
      login: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('renders HomePage if user is not logged in', async () => {
    render(<RootPage />);
    await waitFor(() => {
      expect(screen.getByText(/Access Manager Portal/i)).toBeInTheDocument();
    });
  });

  it('renders SearchPage if user is logged in', async () => {
    const { useUser } = require('@/context/UserContext');
    // Override mock for logged-in state.
    useUser.mockReturnValue({
      loggedIn: true,
      currentUser: { firstName: 'Jane', lastName: 'Doe' },
      login: jest.fn(),
      logout: jest.fn(),
    });

    // Re-import the RootPage after updating the mock.
    const LoggedInRootPage = require('@/pages/index').default;
    render(<LoggedInRootPage />);
    
    // Wait for SearchPage to display manager details.
    await waitFor(() => {
      expect(screen.getByText(/Manager:/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
    });
  });
});

