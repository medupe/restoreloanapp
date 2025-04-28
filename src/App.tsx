import { useState } from 'react'; // Import React and useState hook
import LoginComponent from './components/login/LoginComponent';
import RegisterComponent from './components/register/RegisterComponent';
import UserProfile from './components/profile/UserProfile'; // Import UserProfile

import './App.css'; // Your main app styles
// Import Navigate for protected routes
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import DashboardComponent from './components/dashboard/DashboardComponent';
import UserBankAccounts from './components/bank/UserBankAccounts';
import DocumentUpload from './components/document/DocumentUpload';

// --- Define and EXPORT UserData (Ensure it includes 'id') ---
export interface UserData {
  id: number; // <-- Make sure ID is here
  username: string;
  // Add more fields if needed
}

// --- Define UploadedDocument (if not imported from elsewhere) ---
interface UploadedDocument {
  id: number; user_id: number; loan_id: number | null; document_name: string;
  file_name: string; file_path: string; file_size: number; status: string;
  upload_date: string; remarks: string | null;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // --- Proper Authentication State ---
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null); // Start as null

  const handleLoginSuccess = (userData: UserData) => {
    // Ensure the userData passed from LoginComponent includes the 'id'
    if (typeof userData.id !== 'number') {
      console.error("Login success handler received user data without an ID:", userData);
      alert("Login failed: Missing user ID.");
      return;
    }
    console.log('Login successful in App component!', userData);
    setLoggedInUser(userData); // Set the logged-in user state
    alert(`Welcome back, ${userData.username}!`);
    // Consider using useNavigate() hook here for programmatic navigation after login
  };

  const handleLogout = () => {
    alert('Logging out...');
    setLoggedInUser(null); // Clear user state
    // Redirect to login page happens via the Route definitions
  };

  // --- Handler for Document Upload Success ---
  // This function now USES the uploadedDocument parameter
  const handleDocUploadSuccess = (uploadedDocument: UploadedDocument) => {
    console.log("Document Uploaded in App:", uploadedDocument);
    alert(`Document "${uploadedDocument.document_name}" (ID: ${uploadedDocument.id}) uploaded successfully.`);
    // TODO: Maybe refresh a list of documents or navigate the user
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <Router>
        <nav className="app-nav">
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <span></span><span></span><span></span>
          </button>
          <ul className={isMenuOpen ? 'open' : ''}>
            {/* Conditional Links based on login status */}
            {!loggedInUser ? (
              <>
                <li><Link to="/" onClick={closeMenu}>Login</Link></li>
                <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                <li><Link to="/bank" onClick={closeMenu}>Bank Accounts</Link></li>
                <li><Link to="/document" onClick={closeMenu}>Upload Document</Link></li> {/* Corrected path */}
              </>
            )}
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            {loggedInUser && (
              <li><button onClick={() => { handleLogout(); closeMenu(); }} className="logout-nav-button">Logout</button></li>
            )}
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            {/* Public Routes - Redirect if logged in 
            <Route path="/" element={!loggedInUser ? <LoginComponent onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" replace />} />*/}
            <Route path="/register" element={!loggedInUser ? <RegisterComponent /> : <Navigate to="/dashboard" replace />} />
            <Route path="/about" element={<h2>About Page</h2>} />
            <Route path="/contact" element={<h2>Contact Page</h2>} />

            {/* Protected Routes - Redirect if not logged in */}
            <Route
              path="/dashboard"
              element={loggedInUser ? <DashboardComponent userData={loggedInUser} onLogout={handleLogout} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/profile"
              element={loggedInUser ? <UserProfile userId={loggedInUser.id} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/bank"
              element={loggedInUser ? <UserBankAccounts /> : <Navigate to="/" replace />}
            />
            {/* --- Updated Document Upload Route --- */}
            <Route
              path="/document" // Ensure path matches the link
              element={
                loggedInUser ? (
                  <DocumentUpload
                    userId={loggedInUser.id} // Pass the actual user ID
                    onUploadSuccess={handleDocUploadSuccess} // Pass the handler function
                    // Optionally pass loanId if relevant context exists
                  />
                ) : (
                  <Navigate to="/" replace /> // Redirect if not logged in
                )
              }
            />

            {/* Catch-all 404 */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>

        <footer className="dashboard-footer">
          <p>&copy; {new Date().getFullYear()} Restore Loans. All rights reserved.</p>
        </footer>
      </Router>
    </>
  );
}

export default App;
