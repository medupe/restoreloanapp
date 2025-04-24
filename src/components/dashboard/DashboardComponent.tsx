import React, { useState } from 'react';
import ApplyLoanForm from '../loan/ApplyLoanForm';
import StatementHistory from '../statement/StatementHistory';
import './DashboardComponent.css';

// --- Mock Data for Statement History ---
const mockStatements = [
  { id: 1, user_id: 1, loan_id: 101, statement_type: 'Monthly Statement - Mar 2024', file_path: '/statements/mar2024_101.pdf' },
  { id: 2, user_id: 1, loan_id: 101, statement_type: 'Monthly Statement - Feb 2024', file_path: '/statements/feb2024_101.pdf' },
  { id: 3, user_id: 1, loan_id: 101, statement_type: 'Monthly Statement - Jan 2024', file_path: '/statements/jan2024_101.pdf' },
  { id: 4, user_id: 1, loan_id: 205, statement_type: 'Annual Statement - 2023', file_path: '/statements/annual2023_205.pdf' },
];

interface DashboardComponentProps {
  userData: { username: string } | null;
  onLogout: () => void;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({ userData, onLogout }) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showStatementHistory, setShowStatementHistory] = useState(false);

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  const handleApplicationSuccess = () => {
    console.log('Loan application succeeded from Dashboard perspective.');
    setShowApplyForm(false);
  };

  const handleCancelApplication = () => {
    setShowApplyForm(false);
  };

  const toggleStatementHistory = () => {
    if (!showStatementHistory) {
      setShowApplyForm(false);
    }
    setShowStatementHistory(!showStatementHistory);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Restore Loans Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {userData.username}!</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <main className="dashboard-content">
        {showApplyForm ? (
          <ApplyLoanForm
            onApplicationSuccess={handleApplicationSuccess}
            onCancel={handleCancelApplication}
          />
        ) : showStatementHistory ? (
          <StatementHistory
            statements={mockStatements}
          />
        ) : (
          <>
            <h2>Your Loan Overview</h2>
            <div className="dashboard-section">
              <p>You currently have [X] active loans.</p>
              <p>Your total outstanding balance is [Amount].</p>
            </div>

            <div className="dashboard-section">
              <h3>Quick Actions</h3>
              <button
                className="action-button"
                onClick={() => {
                  setShowStatementHistory(false);
                  setShowApplyForm(true);
                }}
              >
                Apply for New Loan
              </button>
              <button className="action-button">Make a Payment</button>
              <button
                className="action-button"
                onClick={toggleStatementHistory}
              >
                View Statement History
              </button>
            </div>

            <div className="dashboard-section">
              <h3>Recent Activity</h3>
              <ul>
                <li>Payment received on [Date]</li>
                <li>Loan application [Status] on [Date]</li>
              </ul>
            </div>
          </>
        )}

        {(showApplyForm || showStatementHistory) && (
          <button
            className="back-to-dashboard-button"
            onClick={() => {
              setShowApplyForm(false);
              setShowStatementHistory(false);
            }}
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