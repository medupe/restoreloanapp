import { useState } from 'react'; // Import React and useState hook
import LoginComponent from './components/login/LoginComponent';
import RegisterComponent from './components/register/RegisterComponent';


import './App.css'; // Your main app styles
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardComponent from './components/dashboard/DashboardComponent';
import UserBankAccounts from './components/bank/UserBankAccounts';
import DocumentUpload from './components/document/DocumentUpload';

// Define user data structure
interface UserData {
  username: string;
  // Add more fields if needed
}

function App() {
  // --- State for mobile menu visibility ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginSuccess = (userData: UserData) => {
    console.log('Login successful in App component!', userData);
    alert(`Welcome back, ${userData.username}!`);
    // TODO: Add actual state update or redirection logic here
  };

  const handleLogout = () => {
    alert('Logging out...');
    // TODO: Add actual logout logic (clear state, redirect)
  };

  // Example user data - replace with actual logged-in user state
  const [user] = useState<UserData | null>({ // Use UserData | null for better type safety
    username: 'John Doe',
  });

  // --- Function to toggle the menu ---
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Function to close menu (e.g., after link click) ---
  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <> {/* Use React.Fragment shorthand */}
      {/* Header can stay outside Router if it's always visible 
      <header className="app-header-static"> 
        <h1>Restore Loans Application</h1>
      </header>*/}

      <Router>
        <nav className="app-nav">
          {/* --- Hamburger Button (visible on mobile) --- */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation" // Accessibility
            aria-expanded={isMenuOpen}     // Accessibility
          >
            {/* Simple text or SVG/Icon Font */}
            {/* Using spans for lines is common */}
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* --- Navigation Links --- */}
          {/* Add conditional 'open' class */}
          <ul className={isMenuOpen ? 'open' : ''}>
            {/* Add onClick={closeMenu} to links */}
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/bank" onClick={closeMenu}>Bank</Link></li>
            <li><Link to="/document" onClick={closeMenu}>document</Link></li>
            {/* Only show Dashboard link if user is logged in */}
            <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route
              path="/dashboard"
              element={user ? <DashboardComponent userData={user} onLogout={handleLogout} /> : <h2>Please log in to view the dashboard.</h2>}
            />
            <Route path="/about" element={<h2>About Page</h2>} />
            <Route path="/bank" element={<UserBankAccounts />} />
            <Route path="/document" element={<DocumentUpload userId={0} onUploadSuccess={function (): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="/contact" element={<h2>Contact Page</h2>} />
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