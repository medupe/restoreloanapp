import React, { useState } from 'react';
import './MakePaymentForm.css'; // We'll create this CSS file next

interface MakePaymentFormProps {
  loanId: string; // Example: ID of the loan being paid
  currentBalance?: number; // Optional: Display current balance
  onPaymentSuccess?: (paymentDetails: { amount: number; loanId: string }) => void;
  onCancel?: () => void;
}

const MakePaymentForm: React.FC<MakePaymentFormProps> = ({
  loanId,
  currentBalance,
  onPaymentSuccess,
  onCancel,
}) => {
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    const amount = parseFloat(paymentAmount);

    // Basic Validation
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid positive payment amount.');
      setIsLoading(false);
      return;
    }
    // Optional: Check against balance if provided
    // if (currentBalance !== undefined && amount > currentBalance) {
    //   setError(`Payment amount cannot exceed the current balance of $${currentBalance.toFixed(2)}.`);
    //   setIsLoading(false);
    //   return;
    // }

    const paymentData = {
      loan_id: loanId,
      payment_amount: amount,
      payment_date: new Date().toISOString(), // Include payment date
    };

    try {
      // --- Simulate API Call ---
      // Replace this with your actual fetch/axios call to your backend endpoint
      console.log('Submitting payment data:', paymentData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // Assume API call is successful
      // --- End Simulation ---

      console.log('Payment Successful!', paymentData);
      setSuccessMessage(`Payment of $${amount.toFixed(2)} for Loan ID ${loanId} submitted successfully!`);
      setPaymentAmount(''); // Reset form field

      // Notify parent component of success
      if (onPaymentSuccess) {
        onPaymentSuccess({ amount: amount, loanId: loanId });
      }

    } catch (err: any) {
      console.error('Payment failed:', err);
      setError(err.message || 'An error occurred during payment submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="make-payment-container">
      <h3>Make a Payment</h3>
      {currentBalance !== undefined && (
        <p className="current-balance">Current Balance: ${currentBalance.toFixed(2)}</p>
      )}
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-group">
          <label htmlFor="paymentAmount">Payment Amount ($):</label>
          <input
            type="number"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
            min="0.01" // Minimum payment amount
            step="0.01" // Allow cents
            placeholder="e.g., 100.50"
            disabled={isLoading}
            aria-describedby={error ? 'payment-error' : undefined} // Accessibility
          />
          {error && <span id="payment-error" className="visually-hidden">{error}</span>} {/* For screen readers */}
        </div>

        {/* Optional: Add fields for payment method if needed */}
        {/*
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select id="paymentMethod" disabled={isLoading}>
            <option value="bank">Bank Account</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>
        */}

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Submit Payment'}
          </button>
          {onCancel && (
            <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MakePaymentForm;

