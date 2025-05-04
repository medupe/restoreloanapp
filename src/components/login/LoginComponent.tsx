import React, { useState, FormEvent } from 'react';
import './LoginComponent.css';
import {  Link } from 'react-router-dom';
import { LoginFormData, loginUser } from '../../api/userService';
import { User } from '../../interface/interfaces';
import { useNavigate } from 'react-router-dom';
interface LoginComponentProps {
  onLoginSuccess: (userData: User) => void;
}

const LoginComponent: React.FC<LoginComponentProps> =({onLoginSuccess}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  
     const [fieldErrors, setFieldErrors] = useState<{
      username?: string;
      password?: string;
      grant_type?: string;
      client_id?: string;
      client_secret?: string;
      scope?: string;
      
      }>({});
        const [successMessage, setSuccessMessage] = useState('');
  const newErrors: typeof fieldErrors = {};
  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(username)) {

      newErrors.username = 'Please enter a valid email.';
      setIsLoading(false);
    //  return;
    }
  
    if (password.length ==0) {
      newErrors.password = 'Field is required.';

      setIsLoading(false);
   //   return;
    }
    if (Object.keys(newErrors).length > 0) {

      setFieldErrors(newErrors);
      setIsLoading(false);
      return;
    }
    const loginData: LoginFormData = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: '',
      client_secret: '',
      scope: '',
    };
    setFieldErrors({});
     try {
          console.log('Submitting login data:', loginData);
    
          // Call the API function
          const result = await loginUser(loginData);
     
          console.error('login success:', result.access_token);
          localStorage.setItem('access_token', result.access_token); 
          localStorage.setItem('user', JSON.stringify(result.user)); 
          setSuccessMessage('Login successful! You can now log in.'); 
  
          setUsername('');
       
          setPassword('');
      
        //  navigate('/dashboard'); // ✅ Navigate to dashboard
        onLoginSuccess(result.user);
   
        navigate('/dashboard', { state: { user: result.user } });
          // Optionally redirect the user to the login page
    
        } catch (err: any) {
          newErrors.username = 'Incorrect username or password.';
  
          setFieldErrors(newErrors);
          console.error('Registration failed:', err);
          // Use a more user-friendly error message if possible
         
          setIsLoading(false);
        } finally {
          setIsLoading(false); // Ensure loading state is turned off
        }
  };

  return (
    <>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
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
        {fieldErrors.username && (
            <p className="error-message">{fieldErrors.username}</p>
        )}

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
        {fieldErrors.password && (
            <p className="error-message">{fieldErrors.password}</p>
        )}

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