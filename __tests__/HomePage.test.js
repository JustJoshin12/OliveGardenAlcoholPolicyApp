// __tests__/HomePage.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/pages/home';
import { useUser } from '@/context/UserContext';

jest.mock('@/context/UserContext');

describe('HomePage', () => {
  beforeEach(() => {
    useUser.mockReturnValue({
      loggedIn: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('renders a login button if not logged in', async () => {
    render(<HomePage />);
    // Wait for any asynchronous updates (such as data fetching) to complete.
    await waitFor(() => {
      expect(screen.getByText(/Access Manager Portal/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('opens the policy modal when "Policy" button is clicked', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/Access Manager Portal/i)).toBeInTheDocument();
    });

    // Click the button that opens the policy modal.
    const policyButton = screen.getByRole('button', { name: /policy/i });
    fireEvent.click(policyButton);

    // Wait for the PolicyModal to appear.
    await waitFor(() => {
      expect(screen.getByText(/Enhanced Age Verification/i)).toBeInTheDocument();
    });
  });
});
