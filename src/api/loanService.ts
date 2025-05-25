import { ApiErrorResponse } from "../interface/interfaces";

  export interface LoanFormData {
    loan_type: string;
    loan_amount: number;
    interest_rate: number;
    loan_term: number;
    monthly_installment: number;
    start_date: string;
    end_date: string;
    user_id: number;
  }
  export interface LoanSuccessResponse {
    loan_type: 'home' | 'auto' | 'personal' | string; // Adjust types as needed
    loan_amount: number;
    interest_rate: number;
    loan_term: number;
    monthly_installment: number;
    start_date: string; // ISO 8601 format, e.g., "2025-05-22"
    end_date: string;
    id: number;
    user_id: number;
    status: 'active' | 'inactive' | 'closed' | string; // Extend based on known statuses
    created_at: string; // ISO 8601 format with timezone
  
  }

    
export const addLoan = async (data: LoanFormData): Promise<LoanSuccessResponse> => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/loans`;
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
          let errorMessage = `loan failed: ${response.status} ${response.statusText}`; // Slightly clearer default message
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
      const successData: LoanSuccessResponse = await response.json();
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
