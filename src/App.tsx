import { useState } from 'react'; // Import React and useState hook
import LoginComponent from './components/login/LoginComponent';
import RegisterComponent from './components/register/RegisterComponent';

import './App.css'; // Your main app styles
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardComponent from './components/dashboard/DashboardComponent';
import UserBankAccounts from './components/bank/UserBankAccounts';
import DocumentUpload from './components/document/DocumentUpload';

import HomePage from './components/home/HomePage';

import { User } from './interface/interfaces';
import AboutPage from './components/about/AboutPage';



function App() {

  // --- State for mobile menu visibility ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const handleLogout = () => {
    alert('Logging out...');
    // TODO: Add actual logout logic (clear state, redirect)
  };

  // Example user data - replace with actual logged-in user state

  const [user,setUsername] = useState<User | null>();
const handleLoginSuccess = (userData:any) => {
  console.log('Login successful in App component!', userData);
  const mappedUser: User = {
    id: userData.id,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone_number: userData.phone_number,
    id_number: '',
    password: '',
    created_at: '',
    gender: '',
    is_active: false
  };
  setUsername(mappedUser);
};
  // --- Function to toggle the menu ---
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Function to close menu (e.g., after link click) ---
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <> {/* Use React.Fragment shorthand */}
      <Router>
        <nav className="app-nav">
          {/* --- Hamburger Button (visible on mobile) --- */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation" // Accessibility
            aria-expanded={isMenuOpen}     // Accessibility
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

            {/* --- Navigation Links --- */}
            <ul className={isMenuOpen ? 'open' : ''}>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/bank" onClick={closeMenu}>Bank</Link></li>
            <li><Link to="/document" onClick={closeMenu}>Document</Link></li>
            {user && <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>}
            <li><Link to="/login" onClick={closeMenu}>My Account</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>
          </nav>

          <main className="main-content">
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route
              path="/dashboard"
              element={user ? <DashboardComponent userData={{user}} onLogout={handleLogout} /> : <h2>Please log in to view the dashboard.</h2>}
            />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/bank" element={<UserBankAccounts />} />
            <Route path="/document" element={<DocumentUpload userId={0} onUploadSuccess={() => alert('Document uploaded successfully!')} />} />
            <Route path="/contact" element={<h2>Contact Page</h2>} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
            </Routes>
        </main>

        <footer
          className="dashboard-footer"
          style={{
            backgroundImage: "url('/src/assets/images/footer_bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <p>&copy; {new Date().getFullYear()} Restore Loans. All rights reserved by <a href="https://RestoreLoans.com" target="_blank">RestoreLoans</a> </p>
        </footer>
      </Router>
    </>
  );
}

export default App;
