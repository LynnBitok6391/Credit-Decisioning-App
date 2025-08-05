/**
 * Registration helper utilities for better error handling and user feedback
 */

export interface RegistrationError {
  field?: string;
  message: string;
  type: 'validation' | 'server' | 'network';
}

export interface RegistrationResponse {
  success: boolean;
  errors?: RegistrationError[];
  userId?: string;
}

export const validateRegistrationData = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): RegistrationError[] => {
  const errors: RegistrationError[] = [];

  // Email validation
  if (!data.email) {
    errors.push({ field: 'email', message: 'Email is required', type: 'validation' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address', type: 'validation' });
  }

  // Password validation
  if (!data.password) {
    errors.push({ field: 'password', message: 'Password is required', type: 'validation' });
  } else if (data.password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters', type: 'validation' });
  }

  // Name validation
  if (!data.firstName?.trim()) {
    errors.push({ field: 'firstName', message: 'First name is required', type: 'validation' });
  }
  if (!data.lastName?.trim()) {
    errors.push({ field: 'lastName', message: 'Last name is required', type: 'validation' });
  }

  return errors;
};

export const getRegistrationErrorMessage = (error: string): string => {
  const errorMap: Record<string, string> = {
    'Email already in use': 'This email address is already registered. Please use a different email or try logging in.',
    'Invalid email format': 'Please enter a valid email address.',
    'Password too weak': 'Password must be at least 6 characters long.',
    'Network error': 'Registration failed. Please check your connection and try again.',
    'Server error': 'Registration failed. Please try again later or contact support.'
  };

  return errorMap[error] || 'Registration failed. Please try again.';
};

export const formatRegistrationError = (error: any): RegistrationError => {
  if (typeof error === 'string') {
    return { message: error, type: 'server' };
  }
  
  if (error.message) {
    return { message: error.message, type: 'server' };
  }
  
  return { message: 'An unexpected error occurred', type: 'server' };
};
