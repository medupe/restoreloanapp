// import React, { useState, FormEvent } from 'react';
// import './RegisterComponent.css';

// import { registerUser, RegisterFormData } from './../../api/userService';

// // Define the props for LoginComponent


// const LoginComponent: React.FC= () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [idNumber, setIdNumber] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [cellNumber, setCellNumber] = useState('');
//   const [gender, setGender] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formData] = useState<RegisterFormData>({
//     firstName:firstName ,
//     lastName: lastName,
//     email: username,
//     password: password,
//     idNumber:idNumber,
//     cellNumber:cellNumber,
//     gender:gender,
//   });
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); 
   




//       try {
      
//         console.log(formData);
  
        
//   const result = await registerUser(formData);
//   console.log(result);
   
//         setIsLoading(false); 
   
//       } catch (err: any) {

//         setError(err.message)
  

//       }
//       finally {
//         setIsLoading(false); 
   
//       }

//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p className="error-message">{error}</p>}

//         <div className="form-group">
//           <label htmlFor="username">Email:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             disabled={isLoading}
//             autoComplete="username"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="firstName">First name:</label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//             disabled={isLoading}
//             autoComplete="firstName"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last name:</label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//             disabled={isLoading}
//             autoComplete="firstName"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="cellNumber">Cell number:</label>
//           <input
//             type="text"
//             id="cellNumber"
//             value={cellNumber}
//             onChange={(e) => setCellNumber(e.target.value)}
//             required
//             disabled={isLoading}
//             autoComplete="cellNumber"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="idNumber">ID number:</label>
//           <input
//             type="text"
//             id="idNumber"
//             value={idNumber}
//             onChange={(e) => setIdNumber(e.target.value)}
//             required
//             disabled={isLoading}
//             autoComplete="idNumber"
//           />
//         </div>
       
//         <select
//           name="gender" id='gender' className='form-group select'
//         value={gender}
//          onChange={(e) => setGender(e.target.value)}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             disabled={isLoading}
//             autoComplete="current-password"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             disabled={isLoading}
//             autoComplete="confirm-password"
//           />
//         </div>

//         <button type="submit" className="login-button" disabled={isLoading}>
//           {isLoading ? 'Logging in...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginComponent;
import React, { useState, FormEvent } from 'react';
import './RegisterComponent.css';
import { registerUser, RegisterFormData } from './../../api/userService'; // Ensure this path is correct

// Renamed component to RegisterComponent
const RegisterComponent: React.FC = () => {
  // State for each form field
  const [username, setUsername] = useState(''); // Assuming username is the email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [gender, setGender] = useState('');

  // State for loading and error feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Optional: for success feedback

  // Removed the incorrect formData state initialization here

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    setIsLoading(true);

    // --- Validation ---
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return; // Stop submission
    }

    // Add more validation if needed (e.g., password strength, email format, ID number format)

    // --- Construct Data Object ---
    // Create the data object *here* using the current state values
    const registrationData: RegisterFormData = {
      firstName: firstName,
      lastName: lastName,
      email: username, // Make sure 'username' state holds the email
      password: password,
      idNumber: idNumber,
      cellNumber: cellNumber,
      gender: gender,
    };

    try {
      console.log('Submitting registration data:', registrationData);

      // Call the API function
      const result = await registerUser(registrationData);
      console.log('Registration successful:', result);

      setSuccessMessage('Registration successful! You can now log in.'); // Set success message
      // Optionally clear the form fields on success
      setUsername('');
      setFirstName('');
      setLastName('');
      setIdNumber('');
      setCellNumber('');
      setGender('');
      setPassword('');
      setConfirmPassword('');
      // Optionally redirect the user to the login page

    } catch (err: any) {
      console.error('Registration failed:', err);
      // Use a more user-friendly error message if possible
      setError(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false); // Ensure loading state is turned off
    }
  };

  return (
    // Changed class name for clarity, though login-container might still work if CSS is shared
    <div className="login-container">
      <h2>Register</h2> {/* Changed title */}
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="email" // Use type="email" for better validation/semantics
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="email" // Use "email" for autocomplete
          />
        </div>

        {/* First Name Input */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="given-name" // More specific autocomplete
          />
        </div>

        {/* Last Name Input */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="family-name" // More specific autocomplete
          />
        </div>

        {/* Cell Number Input */}
        <div className="form-group">
          <label htmlFor="cellNumber">Cell Number:</label>
          <input
            type="tel" // Use type="tel" for semantics
            id="cellNumber"
            value={cellNumber}
            onChange={(e) => setCellNumber(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="tel"
          />
        </div>

        {/* ID Number Input */}
        <div className="form-group">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text" // Consider pattern validation if format is specific
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
            disabled={isLoading}
            // No standard autocomplete for national ID, leave it off or use custom
          />
        </div>

        {/* Gender Select - Fixed Structure */}
        <div className="form-group"> {/* Added wrapping div */}
          <label htmlFor="gender">Gender:</label> {/* Added label */}
          <select
            name="gender"
            id='gender'
            // Removed 'form-group' from className, keep 'select' if used for styling
            className='select'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            disabled={isLoading} // Added disabled attribute
          >
            <option value="" disabled>Select Gender</option> {/* Good practice: disabled default option */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            {/* Consider "Prefer not to say" option */}
          </select>
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="new-password" // Use "new-password" for registration
          />
        </div>

        {/* Confirm Password Input */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="new-password" // Use "new-password" here too
          />
        </div>

        {/* Submit Button */}
        {/* Changed class name for clarity, though login-button might still work */}
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'} {/* Updated loading text */}
        </button>
      </form>
    </div>
  );
};

// Updated export name
export default RegisterComponent;
