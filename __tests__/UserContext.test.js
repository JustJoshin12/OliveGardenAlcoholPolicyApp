// __tests__/UserContext.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProvider, useUser } from '@/context/UserContext';

const TestComponent = () => {
  const { loggedIn, currentManager, login, logout } = useUser();
  return (
    <div>
      <p>Logged In: {loggedIn ? 'Yes' : 'No'}</p>
      <p>Manager: {currentManager ? `${currentManager.firstName} ${currentManager.lastName}` : 'No manager'}</p>
      <button onClick={() => login({ username: 'test', password: 'test' })}>Log In</button>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

describe('UserContext', () => {
  it('defaults to loggedOut state', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByText(/Logged In: No/i)).toBeInTheDocument();
    expect(screen.getByText(/Manager: No manager/i)).toBeInTheDocument();
  });

  it('updates when login is called', async () => {
    // Override signIn to simulate a successful login.
    const { signIn } = require('next-auth/react');
    signIn.mockResolvedValueOnce(null);
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    await waitFor(() => {
      expect(screen.getByText(/Logged In: Yes/i)).toBeInTheDocument();
    });
  });

  it('updates when logout is called', async () => {
    const { signIn, signOut } = require('next-auth/react');
    signIn.mockResolvedValueOnce(null);
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    await waitFor(() => {
      expect(screen.getByText(/Logged In: Yes/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /Log Out/i }));
    await waitFor(() => {
      expect(screen.getByText(/Logged In: No/i)).toBeInTheDocument();
    });
  });
});
