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

  const [successMessage, setSuccessMessage] = useState(''); // Optional: for success feedback
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    idNumber?: string;
    cellNumber?: string;
    gender?: string;
  }>({});
  const newErrors: typeof fieldErrors = {};


  // Removed the incorrect formData state initialization here
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    console.log("medupe molepo");
  
    setSuccessMessage(''); // Clear previous success messages
    setIsLoading(true);

     // --- Validation ---
     if (!username || !password || !confirmPassword || !firstName || !lastName || !cellNumber || !idNumber || !gender) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
  }

  // --- Email Format Validation --- // Highlighted Change Start
  if (!emailRegex.test(username)) {
    setError('Please enter a valid email address.');
    setIsLoading(false);
    return; // Stop submission
  }
  // Highlighted Change End

    // --- Validation ---
 
    if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(username)) {

      newErrors.username = 'Please enter a valid email.';
      setIsLoading(false);
    //  return;
    }
  
    if (password.length < 8) {
      newErrors.confirmPassword = 'Password must be at least 8 characters long.';

      setIsLoading(false);
   //   return;
    }
  
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
 
      setIsLoading(false);
   //   return;
    }
  
    if (!/^\d{10,15}$/.test(cellNumber)) {
      newErrors.cellNumber = 'Cell number must be 10 digits';
     
      setIsLoading(false);
   //   return;
    }
  
    if (idNumber.length < 13 || idNumber.length > 13) {
      newErrors.idNumber = 'Enter valid Id number';

      setIsLoading(false);
    //  return;
    }
  
    if (!gender) {
      newErrors.gender = 'Gender is required.';
   
      setIsLoading(false);
    //  return;
    }
  
    if (!firstName.trim()  ) {
   
      newErrors.firstName = 'First Name is required.';
      setIsLoading(false);
     // return;
    }
    if (!lastName.trim() ) {
    
      newErrors.lastName = 'Last Name is required.';
      setIsLoading(false);
    //  return;
    }
    if (Object.keys(newErrors).length > 0) {

      setFieldErrors(newErrors);
      setIsLoading(false);
   return;
    }
    
    setFieldErrors({});

    // Add more validation if needed (e.g., password strength, email format, ID number format)

    // --- Construct Data Object ---
    // Create the data object *here* using the current state values
    const registrationData: RegisterFormData = {
      first_name: firstName,
      last_name: lastName,
      email: username, // Make sure 'username' state holds the email
      password: password,
      id_number: idNumber,
      phone_number: cellNumber,
      gender: gender,
      is_active: true
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
      newErrors.username = 'Email already exist.';
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

      <h2>Register</h2> {/* Changed title */}
      <form onSubmit={handleSubmit} noValidate>

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
            autoComplete="email" 
            className="input-error"
          />
        </div>
        {fieldErrors.username && (
            <p className="error-message">{fieldErrors.username}</p>
        )}
        

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
        {fieldErrors.firstName && (
            <p className="error-message">{fieldErrors.firstName}</p>
        )}

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
        {fieldErrors.lastName && (
            <p className="error-message">{fieldErrors.lastName}</p>
        )}


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
        {fieldErrors.cellNumber && (
            <p className="error-message">{fieldErrors.cellNumber}</p>
        )}


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
        {fieldErrors.idNumber && (
            <p className="error-message">{fieldErrors.idNumber}</p>
        )}


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
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            {/* Consider "Prefer not to say" option */}
          </select>
        </div>
        {fieldErrors.gender && (
            <p className="error-message">{fieldErrors.gender}</p>
        )}


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
        {fieldErrors.password && (
            <p className="error-message">{fieldErrors.password}</p>
        )}


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
        {fieldErrors.confirmPassword && (
            <p className="error-message">{fieldErrors.confirmPassword}</p>
        )}


        {/* Submit Button */}
        {/* Changed class name for clarity, though login-button might still work */}
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'} {/* Updated loading text */}
        </button>
      </form>
    </div>
    </>

  );
};

// Updated export name
export default RegisterComponent;
