// src/components/profile/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import './UserProfile.css'; // We'll create this CSS file next

// --- Interface for User Profile Data (expand as needed) ---
interface UserProfileData {
  id: number; // Assuming the user has an ID
  firstName: string;
  lastName: string;
  email: string;
  cellNumber: string;
  idNumber?: string; // Optional: Might not always be fetched or displayed
  gender?: string;   // Optional
  createdAt?: string; // Example: Account creation date
  // Add other fields your API might return (e.g., address, dob, etc.)
}

// --- Interface for API Error Response ---
interface ApiErrorResponse {
  message: string;
}

// --- Component Props ---
interface UserProfileProps {
  userId: number; // Pass the ID of the user whose profile to display
}

// --- React Component ---
const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // --- Fetch User Profile Data ---
    const fetchUserProfile = async () => {
      // IMPORTANT: Replace with your actual API endpoint for fetching user details
      // It likely needs the user ID.
      const apiUrl = `https://restoreloans-apis.onrender.com/api/users/${userId}`; // <-- EXAMPLE ENDPOINT - CHANGE THIS

      setIsLoading(true);
      setError(null);
      setProfileData(null); // Clear previous data

      try {
        // --- Get Auth Token (Replace with your actual auth logic) ---
        // const token = localStorage.getItem('authToken'); // Example: Get token
        // if (!token) {
        //   throw new Error('Authentication required.');
        // }

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Add Authorization header if needed
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          let errorMessage = `Failed to fetch profile: ${response.status} ${response.statusText}`;
          try {
            const errorData: ApiErrorResponse = await response.json();
            if (errorData?.message) {
              errorMessage = errorData.message;
            }
          } catch (jsonError) {
            console.error("Failed to parse error response JSON:", jsonError);
          }
          // Handle specific errors like 401 Unauthorized or 404 Not Found
          if (response.status === 404) {
             errorMessage = 'User profile not found.';
          } else if (response.status === 401) {
             errorMessage = 'Unauthorized. Please log in again.';
             // TODO: Potentially trigger logout flow
          }
          throw new Error(errorMessage);
        }

        const data: UserProfileData = await response.json();
        setProfileData(data);

      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) { // Only fetch if a valid userId is provided
        fetchUserProfile();
    } else {
        setError("User ID is missing.");
        setIsLoading(false);
    }

  }, [userId]); // Re-fetch if userId changes

  // --- Render Logic ---
  if (isLoading) {
    return <div className="loading-message">Loading profile...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!profileData) {
    // This case might happen if loading finished but data is still null (e.g., initial state or unexpected issue)
    return <div className="no-data-message">Profile data could not be loaded.</div>;
  }

  // --- Display Profile ---
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-field">
          <span className="profile-label">First Name:</span>
          <span className="profile-value">{profileData.firstName}</span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Last Name:</span>
          <span className="profile-value">{profileData.lastName}</span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{profileData.email}</span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Cell Number:</span>
          <span className="profile-value">{profileData.cellNumber}</span>
        </div>
        {/* Conditionally display optional fields */}
        {profileData.gender && (
          <div className="profile-field">
            <span className="profile-label">Gender:</span>
            <span className="profile-value">{profileData.gender}</span>
          </div>
        )}
         {/* Example: Displaying ID Number (Consider masking or omitting for privacy) */}
        {profileData.idNumber && (
          <div className="profile-field">
            <span className="profile-label">ID Number:</span>
            {/* Example Masking: Show only last 4 digits */}
            <span className="profile-value">**********{profileData.idNumber.slice(-4)}</span>
            {/* Or simply: <span className="profile-value">{profileData.idNumber}</span> */}
          </div>
        )}
        {profileData.createdAt && (
          <div className="profile-field">
            <span className="profile-label">Member Since:</span>
            <span className="profile-value">{new Date(profileData.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="profile-actions">
        {/* Placeholder for edit functionality */}
        <button className="edit-profile-button" onClick={() => alert('Edit profile functionality not implemented yet.')}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
