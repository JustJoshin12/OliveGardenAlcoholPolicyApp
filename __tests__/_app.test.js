// __tests__/_app.test.js
import { render, screen } from '@testing-library/react';
import MyApp from '@/pages/_app'; // Adjust import path

jest.mock('@/context/UserContext', () => {
  const actualModule = jest.requireActual('@/context/UserContext');
  return {
    ...actualModule,
    UserProvider: ({ children }) => <div data-testid="mock-user-provider">{children}</div>,
  };
});

describe('_app', () => {
  it('renders the UserProvider and child component', () => {
    const MockComponent = () => <div>Test Component</div>;
    render(<MyApp Component={MockComponent} pageProps={{}} />);

    // Check if the mock user provider is used
    expect(screen.getByTestId('mock-user-provider')).toBeInTheDocument();
    // Check if the child component rendered
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
