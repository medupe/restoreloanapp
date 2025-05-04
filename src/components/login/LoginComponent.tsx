import React, { useState, FormEvent } from 'react';
import './LoginComponent.css';
import {  Link } from 'react-router-dom';
// Define the user data type
interface UserData {
  username: string;
  // add more fields if needed
}

// Define the props for LoginComponent
interface LoginComponentProps {
  onLoginSuccess: (userData: UserData) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Fake login logic – replace with actual API call
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        onLoginSuccess({ username });
        setUsername('');
        setPassword('');
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
       <div className="form-group">
        <br></br>
          <Link to="/register">do not have account register?</Link>
        </div>
      </form>

    </div>
    
    </>
  );
};

export default LoginComponent;