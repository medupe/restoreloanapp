// src/api/userService.ts
import axios from 'axios'; // Keep axios import if used elsewhere, or remove if only fetch is used now

// --- Interfaces ---

// Structure of the data needed for registration
export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    idNumber: string;
    cellNumber: string;
    gender: string;
}

// Expected structure of a successful registration response from your API
// Adjust based on what your API actually returns
export interface RegisterSuccessResponse {
    message: string;
    // Add other fields if applicable, e.g., userId, token
    // userId?: number;
    // token?: string;
}

// Expected structure of an error response from your API
// Adjust based on what your API actually returns on failure
export interface ApiErrorResponse {
    message: string;
    // statusCode?: number; // Optional: if your API includes status code in body
    // errors?: Record<string, string>; // Optional: if API returns field-specific errors
}

// --- API Function ---

/**
 * Registers a new user via the API using fetch.
 * @param data - The user registration data conforming to RegisterFormData.
 * @returns A promise that resolves with the success response data (RegisterSuccessResponse).
 * @throws An error with a detailed message if the registration fails or a network error occurs.
 */
export const registerUser = async (data: RegisterFormData): Promise<RegisterSuccessResponse> => {
    const apiUrl = 'https://restoreloans-apis.onrender.com/auth/register';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add other headers like 'Accept' if needed by your API
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Check if the response status code indicates success (2xx range)
        if (!response.ok) {
            let errorMessage = `Registration failed with status ${response.status} (${response.statusText})`;
            try {
                // Attempt to parse the error response body as JSON
                const errorData: ApiErrorResponse = await response.json();
                // Use the message from the API's error response if available
                if (errorData && errorData.message) {
                    errorMessage = errorData.message;
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

        // If the error was thrown by us (due to !response.ok), re-throw it
        // Otherwise, it's likely a network error (e.g., CORS, DNS, server unreachable)
        if (error instanceof Error) {
             // Check if it's the error we threw above or a different one
             // You might want more specific checks depending on expected errors
             throw error; // Re-throw the existing error (could be our detailed one or a network one)
        } else {
            // Handle unexpected error types
            throw new Error('An unexpected network error occurred during registration.');
        }
    }
};

// Example of how another service function might look (e.g., login)
/*
export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginSuccessResponse {
    token: string;
    user: { id: number; email: string; firstName: string; };
}

export const loginUser = async (data: LoginFormData): Promise<LoginSuccessResponse> => {
    // ... similar fetch logic for the login endpoint ...
}
*/

