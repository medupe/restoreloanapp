
import LoginComponent from './components/login/LoginComponent';
import RegisterComponent from './components/register/RegisterComponent';
import  { useState } from 'react';

import './App.css'; // Your main app styles
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardComponent from './components/dashboard/DashboardComponent';
// Define user data structure
interface UserData {
  username: string;
  // Add more fields if needed
}

function App() {
  const handleLoginSuccess = (userData: UserData) => {
    console.log('Login successful in App component!', userData);
    alert(`Welcome back, ${userData.username}!`);
  };
  const handleLogout = () => {
    alert('Logging out...');

  };
  const [user] = useState({
  
    username: 'John Doe',

  });

  return (
    <>
   <header className="app-header"> {/* Use a distinct class if needed */}
    <h1>Restore Loans Application</h1>
  </header>
   
      <Router>
        <nav className="app-nav">
          <Link to="/" >Home</Link>
          <Link to="/about" >About</Link>
          <Link to="/dashboard" >Dashboard</Link>
          <Link to="/about" >Contact</Link>

        </nav>
  
  
        <Routes>
          <Route path="/" element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/dashboard" element={<DashboardComponent userData={user} onLogout={handleLogout}   />} />
        </Routes>
      </Router>
      </>

    
  );

 /* return (
    <>
    <div className="App">
      <header className="App-header">
        <h1>Restore Loans Application</h1>
      </header>
      <main>
        <LoginComponent onLoginSuccess={handleLoginSuccess} />
      </main>
    </div>
 
    </>
  );*/
}

export default App;
