import { ApiErrorResponse, User } from "../interface/interfaces";


export interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  id_number: string;
  phone_number: string;
  gender: string;
  is_active: true,
  
}
export interface LoginFormData {
  username: string;
  password: string;
  grant_type?: string;
  client_id?: string;
  client_secret?: string;
  scope?: string;
  
}
export interface RegisterSuccessResponse {
  message: string;

}
export interface LoginSuccessResponse {
  access_token: string;
  token_type: string;
  user: User;
}





export const registerUser = async (data: RegisterFormData): Promise<RegisterSuccessResponse> => {
  const apiUrl = `${import.meta.env.REACT_APP_API_URL}/auth/register`;
  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json', // Good practice to include Accept header
          },
          body: JSON.stringify(data),
      });

      // Check if the response status code indicates success (2xx range)
      if (!response.ok) {
          let errorMessage = `Registration failed: ${response.status} ${response.statusText}`; // Slightly clearer default message
          try {
              // Attempt to parse the error response body as JSON
              const errorData: ApiErrorResponse = await response.json();
              
              // Use the message from the API's error response if available
              if (errorData?.detail) { // Optional chaining for safety
                  errorMessage = errorData.detail;
              }
          } catch (jsonError) {
              // If the error response wasn't valid JSON, stick with the status text
              console.error("Failed to parse error response JSON:", jsonError);
          }
          // Throw an error that the calling component can catch
          throw new Error(errorMessage);
      }

      // If response is OK, parse the success response body as JSON
      const successData: RegisterSuccessResponse = await response.json();
      return successData;

  } catch (error: any) {
      console.error("Error during registration fetch:", error);

      // If it's already an Error object (could be the one we threw, or a network error)
      if (error instanceof Error) {
           throw error; // Re-throw the existing error
      } else {
          // Handle unexpected error types (less common with fetch)
          throw new Error('An unexpected error occurred during registration.');
      }
  }
};

// Example of how another service function might look (e.g., login)





export const loginUser = async (data: LoginFormData): Promise<LoginSuccessResponse> => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/auth/login`;
  try {

    const body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('username', data.username);
    body.append('password', data.password);
    body.append('scope', '');
    body.append('client_id', '');
    body.append('client_secret', '');

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json', // Good practice to include Accept header
          },
          body: body.toString(),
      });

      // Check if the response status code indicates success (2xx range)
      if (!response.ok) {
          let errorMessage = `Login failed: ${response.status} ${response.statusText}`; // Slightly clearer default message
          try {
              // Attempt to parse the error response body as JSON
              const errorData: ApiErrorResponse = await response.json();
              
              // Use the message from the API's error response if available
              if (errorData?.detail) { // Optional chaining for safety
                  errorMessage = errorData.detail;
              }
          } catch (jsonError) {
              // If the error response wasn't valid JSON, stick with the status text
              console.error("Failed to parse error response JSON:", jsonError);
          }
          // Throw an error that the calling component can catch
          throw new Error(errorMessage);
      }

      // If response is OK, parse the success response body as JSON
      const successData: LoginSuccessResponse = await response.json();
      return successData;

  } catch (error: any) {
      console.error("Error during registration fetch:", error);

      // If it's already an Error object (could be the one we threw, or a network error)
      if (error instanceof Error) {
           throw error; // Re-throw the existing error
      } else {
          // Handle unexpected error types (less common with fetch)
          throw new Error('An unexpected error occurred during registration.');
      }
  }
}

