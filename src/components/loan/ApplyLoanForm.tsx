import React, { useState } from 'react';
import './ApplyLoanForm.css';
import { addLoan, LoanFormData } from '../../api/loanService';
import { User } from '../../interface/interfaces';

interface ApplyLoanFormProps {
  onApplicationSuccess?: () => void;
  onCancel?: () => void;
}

const ApplyLoanForm: React.FC<ApplyLoanFormProps> = ({ onApplicationSuccess, onCancel }) => {
  const [loanType, setLoanType] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!loanType || !loanAmount || !loanTerm || +loanAmount <= 0 || +loanTerm <= 0) {
      setError('Please fill in all fields with valid values.');
      setIsLoading(false);
      return;
    }

    const applicationData = {
      loan_type: loanType,
      loan_amount: parseFloat(loanAmount),
      loan_term: parseInt(loanTerm, 10),
    };
    const currentDate = new Date(); // current date
const expiryDate = new Date(currentDate); // clone current date
expiryDate.setDate(expiryDate.getDate() + 36); 
const userData = localStorage.getItem("user");
       const parsedUser: User = JSON.parse(userData!);
       const from: LoanFormData = {
        loan_type: loanType,
        loan_amount: parseFloat(loanAmount),
        interest_rate: 0.1,
        loan_term: Number(loanTerm),
        monthly_installment: parseFloat(loanAmount),
        start_date: currentDate.toISOString().slice(0, 10),
        end_date: expiryDate.toISOString().slice(0, 10),

        user_id:parsedUser!.id
        };

    try {
    //  await new Promise(resolve => setTimeout(resolve, 1500));
        const result = await addLoan(from);
      console.log('Loan Application Successful!', applicationData);
      setSuccessMessage('Your loan application has been submitted successfully!');
      setLoanType('');
      setLoanAmount('');
      setLoanTerm('');

      if (onApplicationSuccess) {
        onApplicationSuccess();
      }
    } catch (err: any) {
      console.error('Loan Application failed:', err);
      setError(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="apply-loan-container">
      <h3>Apply for a New Loan</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-group">
          <label htmlFor="loanType">Loan Type:</label>
          <select
            id="loanType"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            required
            disabled={isLoading}
          >
            <option value="" disabled>-- Select Loan Type --</option>
            <option value="home">Home Loan</option>
            <option value="personal">Personal Loan</option>
            <option value="auto">Auto Loan</option>
            <option value="business">Business Loan</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount ($):</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
            min="1"
            step="any"
            placeholder="e.g., R10000"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">Loan Term (Months):</label>
          <input
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            required
            min="1"
            step="1"
            placeholder="e.g., 60"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">Payable Loan with Interest:</label>
          <input
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            required
            min="1"
            step="1"
            placeholder="e.g., R10060"
            disabled={isLoading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Application'}
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

export default ApplyLoanForm;