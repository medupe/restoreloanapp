// src/api/userService.ts

export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    idNumber:string;
    cellNumber:string;
    gender:string;

  }
  
  export const registerUser = async (data: RegisterFormData) => {
    const response = await fetch('https://restoreloans-apis.onrender.com/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Registration failed');
    }
  
    return await response.json();
  };
  