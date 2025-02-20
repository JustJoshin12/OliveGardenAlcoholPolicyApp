// __tests__/AgreementModal.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AgreementModal from '@/pages/home/components/AgreementModal';

describe('AgreementModal', () => {
  it('submits form when valid', async () => {
    const mockOnAddData = jest.fn();
    const mockOnClose = jest.fn();

    const { container } = render(
      <AgreementModal
        shiftTime="Lunch"
        timeStamp="01/01/2025"
        isOpen={true}
        onClose={mockOnClose}
        onAddData={mockOnAddData}
      />
    );

    // Simulate filling the form.
    fireEvent.change(screen.getByPlaceholderText(/first/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText(/last/i), {
      target: { value: "Smith" },
    });

    // Override the canvas to return dummy signature data.
    const canvas = container.querySelector("canvas");
    if (canvas) {
      canvas.toDataURL = () => "data:image/png;base64,dummy-signature";
    }

    // Submit the form by clicking the submit button.
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    // Wait for the onAddData callback to be called with expected values.
    await waitFor(() => {
      expect(mockOnAddData).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "Alice",
          lastName: "Smith",
          shiftTime: "Lunch",
          timeStamp: "01/01/2025",
          signature: "data:image/png;base64,dummy-signature",
        })
      );
    });
  });
});
