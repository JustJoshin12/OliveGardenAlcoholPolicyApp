// __tests__/SearchPage.test.js
import { render, screen } from '@testing-library/react';
import SearchPage from '@/pages/searchpage'; 
import { useUser } from '@/context/UserContext';

jest.mock('@/context/UserContext');

describe('SearchPage', () => {
  beforeEach(() => {
    useUser.mockReturnValue({
      loggedIn: true,
      currentManager: { firstName: 'Jane', lastName: 'Doe' },
      logout: jest.fn(),
    });
  });

  it('renders manager’s name and logout button', () => {
    render(<SearchPage />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LogOut/i })).toBeInTheDocument();
  });
});
