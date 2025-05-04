import React, { useState } from 'react';
import ApplyLoanForm from '../loan/ApplyLoanForm';
import StatementHistory from '../statement/StatementHistory';
import MakePaymentForm from '../payment/MakePaymentForm'; // Make sure this path is correct
import './DashboardComponent.css';
import { User } from '../../interface/interfaces';

// --- Mock Data for Statement History ---
const mockStatements = [
  { id: 1, user_id: 1, loan_id: 101, statement_type: 'Monthly Statement - Mar 2024', file_path: '/statements/mar2024_101.pdf' },
  { id: 2, user_id: 1, loan_id: 101, statement_type: 'Monthly Statement - Feb 2024', file_path: '/statements/feb2024_101.pdf' },
  { id: 3, user_id: 1, loan_id: 101, statement_type: 'Monthly Statement - Jan 2024', file_path: '/statements/jan2024_101.pdf' },
  { id: 4, user_id: 1, loan_id: 205, statement_type: 'Annual Statement - 2023', file_path: '/statements/annual2023_205.pdf' },
];

// --- Mock Loan Data (Example - you'll likely fetch this) ---
const mockLoan = {
    id: "LOAN-123",
    balance: 5432.10,
    // other loan details...
};


interface DashboardComponentProps {
  userData: { user: User } | null;
  onLogout: () => void;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({ userData, onLogout }) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showStatementHistory, setShowStatementHistory] = useState(false);
  const [showMakePaymentForm, setShowMakePaymentForm] = useState(false);
  // Example: State to hold the loan selected for payment
  // const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  // const [selectedLoanBalance, setSelectedLoanBalance] = useState<number | undefined>(undefined);

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  // --- Handlers for Apply Loan Form ---
  const handleApplicationSuccess = () => {
    console.log('Loan application succeeded from Dashboard perspective.');
    setShowApplyForm(false); // Hide form on success
    // TODO: Maybe refresh loan list or show a success message on the dashboard overview
  };

  const handleCancelApplication = () => {
    setShowApplyForm(false); // Hide form on cancel
  };

  // --- Handlers for Make Payment Form ---
  const handlePaymentSuccess = (paymentDetails: { amount: number; loanId: string }) => {
    console.log('Payment succeeded from Dashboard:', paymentDetails);
    alert(`Successfully paid $${paymentDetails.amount.toFixed(2)} for loan ${paymentDetails.loanId}`);
    setShowMakePaymentForm(false); // Hide form on success
    // TODO: Refresh loan balance/overview data
  };

  const handleCancelPayment = () => {
    setShowMakePaymentForm(false); // Hide form on cancel
  };

  // --- Toggle Functions for Views ---
  const showApplyLoanView = () => {
    setShowApplyForm(true);
    setShowStatementHistory(false);
    setShowMakePaymentForm(false);
  };

  const showStatementHistoryView = () => {
    setShowApplyForm(false);
    setShowStatementHistory(true);
    setShowMakePaymentForm(false);
  };

  const showMakePaymentView = () => {
    // In a real app, you'd likely select a loan first
    // For now, we use the mock loan directly
    // setSelectedLoanId(mockLoan.id);
    // setSelectedLoanBalance(mockLoan.balance);
    setShowApplyForm(false);
    setShowStatementHistory(false);
    setShowMakePaymentForm(true);
  };

  const showDashboardOverview = () => {
    setShowApplyForm(false);
    setShowStatementHistory(false);
    setShowMakePaymentForm(false);
    // setSelectedLoanId(null); // Clear selected loan if applicable
    // setSelectedLoanBalance(undefined);
  };


  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <header className="dashboard-header">
         <div className="user-info">
          <span>Welcome, {userData.user.first_name} {userData.user.last_name}!</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <main className="dashboard-content">
        {/* --- Conditional Rendering for Different Views --- */}

        {showApplyForm ? (
          <ApplyLoanForm
            onApplicationSuccess={handleApplicationSuccess}
            onCancel={handleCancelApplication} // Use specific cancel or general back
          />
        ) : showStatementHistory ? (
          <StatementHistory
            statements={mockStatements} // Pass actual statements
          />
        ) : showMakePaymentForm ? (
          <MakePaymentForm
            // IMPORTANT: Replace with actual selected loan ID
            loanId={mockLoan.id}
            // Optional: Pass current balance if available
            currentBalance={mockLoan.balance}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={handleCancelPayment} // Use specific cancel or general back
          />
        ) : (
          // --- Default Dashboard Overview ---
          <>
            <h2>Your Loan Overview</h2>
            {/* TODO: Replace placeholders with actual data */}
            <div className="dashboard-section">
              <p>You currently have [X] active loans.</p>
              <p>Your total outstanding balance is [Amount].</p>
              {/* Example: Display details for the mock loan */}
              <p>Loan {mockLoan.id} Balance: ${mockLoan.balance.toFixed(2)}</p>
            </div>

            <div className="dashboard-section">
              <h3>Quick Actions</h3>
              <button
                className="action-button"
                onClick={showApplyLoanView}
              >
                Apply for New Loan
              </button>

              <button
                className="action-button"
                onClick={showMakePaymentView} // Use the specific function
                // disabled={!selectedLoanId} // Example: Disable if no loan selected
              >
               Make a Payment{/* Example text */}
              </button>

              <button
                className="action-button"
                onClick={showStatementHistoryView} // Use the specific function
              >
                View Statement History
              </button>
            </div>

            <div className="dashboard-section">
              <h3>Recent Activity</h3>
              {/* TODO: Replace placeholders with actual data */}
              <ul>
                <li>Payment received on [Date]</li>
                <li>Loan application [Status] on [Date]</li>
              </ul>
            </div>
          </>
        )}

        {/* --- Back Button (appears when not on overview) --- */}
        {(showApplyForm || showStatementHistory || showMakePaymentForm) && (
          <button
            className="back-to-dashboard-button"
            onClick={showDashboardOverview} // Use the function to go back
          >
            Back to Dashboard Overview
          </button>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Restore Loans. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardComponent;
