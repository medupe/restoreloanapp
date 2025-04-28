// src/components/UserBankAccounts.tsx
import React, { useState, useEffect } from 'react';
import './UserBankAccounts.css'; // <-- IMPORT THE CSS FILE

// --- Interface based on your JSON structure ---
interface BankAccount {
  bank_name: string;
  branch_name: string;
  branch_code: string;
  account_holder_name: string;
  account_number: string;
  account_type: string;
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

// --- API Error Interface ---
interface ApiErrorResponse {
  message: string;
}

// --- React Component ---
const UserBankAccounts: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      const apiUrl = 'https://restoreloans-apis.onrender.com/api/user/bank-accounts'; // <-- EXAMPLE ENDPOINT - CHANGE THIS
      //setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${your_auth_token}`, // Add if needed
          },
        });

        if (!response.ok) {
          let errorMessage = `Failed to fetch bank accounts: ${response.status} ${response.statusText}`;
          try {
            const errorData: ApiErrorResponse = await response.json();
            if (errorData?.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            console.error("Failed to parse error response JSON:", jsonError);
          }
          throw new Error(errorMessage);
        }

        const data: BankAccount[] = await response.json();
        setBankAccounts(data);

      } catch (err: any) {
        console.error("Error fetching bank accounts:", err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        setBankAccounts([]);
      } finally {
       // setIsLoading(false);
      }
    };

    fetchBankAccounts();
  }, []);

  // --- Render Logic ---
  // UNCOMMENTED the loading and error states
//   if (isLoading) {
//     // Use the CSS class for loading
//     return <div className="loading-message">Loading bank accounts...</div>;
//   }

  if (error) {
    // Use the CSS class for error
    return <div className="error-message">Error: {error}</div>;
  }

  // --- Main Content ---
  return (
    // Add className to the main container
    <div className="bank-accounts-container">
      <h2>Your Bank Accounts</h2>

      {bankAccounts.length === 0 ? (
        // Use the CSS class for no data
        <div className="no-data-message">No bank accounts found.</div>
      ) : (
        // Add className to the list
        <ul className="bank-accounts-list">
          {bankAccounts.map((account) => (
            // Add className to each list item
            <li key={account.id} className="bank-account-item">
              <strong>{account.bank_name}</strong>
              <div className="branch-info">
                {account.branch_name} - {account.branch_code}
              </div>
              <div className="account-detail">
                <span className="account-detail-label">Account Holder:</span>
                {account.account_holder_name}
              </div>
              <div className="account-detail">
                <span className="account-detail-label">Account Number:</span>
                {/* Add className for masked number */}
                <span className="account-number-masked">
                  *****{account.account_number.slice(-4)}
                </span>
              </div>
              <div className="account-detail">
                <span className="account-detail-label">Account Type:</span>
                 {/* Add className for account type */}
                <span className="account-type">
                  {account.account_type}
                </span>
              </div>
              {/* You might not want to display id, user_id, created_at, updated_at */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBankAccounts;
