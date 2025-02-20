// __tests__/PolicyModal.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PolicyModal from '@/pages/home/components/PolicyModal';

describe('PolicyModal', () => {
  it('renders and calls onAgreement when the checkbox is checked and the Agree button is clicked', async () => {
    const mockOnAgreement = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <PolicyModal onClose={mockOnClose} onAgreement={mockOnAgreement} />
    );

    // Query the checkbox using its associated label.
    const checkbox = screen.getByLabelText(/I have read the policy above/i);
    fireEvent.click(checkbox);

    // Now that the checkbox is checked, the "Agree" button should be enabled.
    const agreeButton = screen.getByRole("button", { name: /Agree/i });
    fireEvent.click(agreeButton);

    // Wait for onAgreement to be called.
    await waitFor(() => {
      expect(mockOnAgreement).toHaveBeenCalled();
    });
  });
});
