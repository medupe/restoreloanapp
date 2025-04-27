import React, { useState, FormEvent } from 'react';
import './RegisterComponent.css';

import { registerUser, RegisterFormData } from './../../api/userService';

// Define the props for LoginComponent


const LoginComponent: React.FC= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [gender, setGender] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData] = useState<RegisterFormData>({
    firstName:firstName ,
    lastName: lastName,
    email: username,
    password: password,
    idNumber:idNumber,
    cellNumber:cellNumber,
    gender:gender,
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
   




      try {
      
        console.log(formData);
  
        
  const result = await registerUser(formData);
  console.log(result);
   
        setIsLoading(false); 
   
      } catch (err: any) {

        setError(err.message)
  

      }
      finally {
        setIsLoading(false); 
   
      }

  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Email:</label>
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
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="firstName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="firstName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cellNumber">Cell number:</label>
          <input
            type="text"
            id="cellNumber"
            value={cellNumber}
            onChange={(e) => setCellNumber(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="cellNumber"
          />
        </div>
        <div className="form-group">
          <label htmlFor="idNumber">ID number:</label>
          <input
            type="text"
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="idNumber"
          />
        </div>
       
        <select
          name="gender" id='gender' className='form-group select'
        value={gender}
         onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="confirm-password"
          />
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;