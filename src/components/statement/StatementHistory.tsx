// src/components/statement/StatementHistory.tsx
import React from 'react';
import './StatementHistory.css';

// Define the type for each statement item
interface Statement {
  id: number;
  loan_id: number;
  statement_type: string;
  file_path: string;
}

// Define the props for the component
interface StatementHistoryProps {
  statements?: Statement[];
  isLoading?: boolean;
  error?: Error | null;
}

const StatementHistory: React.FC<StatementHistoryProps> = ({
  statements = [],
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return <div className="statement-loading">Loading statement history...</div>;
  }

  if (error) {
    return (
      <div className="statement-error">
        Error loading statements: {error.message || 'Unknown error'}
      </div>
    );
  }

  if (!statements.length) {
    return <div className="statement-empty">No statement history found.</div>;
  }

  return (
    <div className="statement-history-container">
      <h3>Statement History</h3>
      <table className="statement-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Statement Type / Period</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {statements.map(({ id, loan_id, statement_type, file_path }) => (
            <tr key={id}>
              <td>{loan_id}</td>
              <td>{statement_type}</td>
              <td>
                <a
                  href={file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-statement-link"
                >
                  View/Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatementHistory;