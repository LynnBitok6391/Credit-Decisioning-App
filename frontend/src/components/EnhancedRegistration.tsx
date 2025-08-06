/**
 * Enhanced Registration Component with improved error handling and user feedback
 */

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RegistrationError } from '../utils/registrationHelper';

interface EnhancedRegistrationProps {
  onSuccess?: () => void;
  onError?: (errors: RegistrationError[]) => void;
}

export function EnhancedRegistration({ onSuccess, onError }: EnhancedRegistrationProps) {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegistrationError[]>([]);
  const [emailChecking, setEmailChecking] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'admin' | 'user'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      // Validate form data
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        onError?.(validationErrors);
        return;
      }

      // Normalize email before registration
      const normalizedEmail = formData.email.trim().toLowerCase();

      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: normalizedEmail,
        password: formData.password,
        role: formData.role
      });

      if (success) {
        onSuccess?.();
      } else {
        const serverError: RegistrationError = {
          message: 'This email address is already registered. Please use a different email or try logging in.',
          type: 'server'
        };
        setErrors([serverError]);
        onError?.([serverError]);
      }
    } catch (error) {
      const networkError: RegistrationError = {
        message: 'Registration failed. Please check your connection and try again.',
        type: 'network'
      };
      setErrors([networkError]);
      onError?.([networkError]);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFormData = (data: typeof formData): RegistrationError[] => {
    const errors: RegistrationError[] = [];

    // Name validation
    if (!data.firstName.trim()) {
      errors.push({ field: 'firstName', message: 'First name is required', type: 'validation' });
    }
    if (!data.lastName.trim()) {
      errors.push({ field: 'lastName', message: 'Last name is required', type: 'validation' });
    }

    // Email validation
    if (!data.email.trim()) {
      errors.push({ field: 'email', message: 'Email is required', type: 'validation' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address', type: 'validation' });
    } else if (emailAvailable === false) {
      errors.push({ field: 'email', message: 'This email is already registered', type: 'validation' });
    }

    // Password validation
    if (!data.password) {
      errors.push({ field: 'password', message: 'Password is required', type: 'validation' });
    } else if (data.password.length < 6) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters', type: 'validation' });
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Passwords do not match', type: 'validation' });
    }

    return errors;
  };

  const checkEmailAvailability = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailAvailable(null);
      return;
    }

    setEmailChecking(true);
    try {
      const response = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      setEmailAvailable(data.available);
    } catch (error) {
      console.error('Error checking email availability:', error);
      setEmailAvailable(null);
    } finally {
      setEmailChecking(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormData({ ...formData, email: newEmail });
    
    // Debounce email checking
    const timeoutId = setTimeout(() => {
      checkEmailAvailability(newEmail);
    }, 500);
    
    // Clear previous timeout
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields with enhanced validation */}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
            className="form-control"
            placeholder="Enter your first name"
            title="First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
            className="form-control"
            placeholder="Enter your last name"
            title="Last Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              required
              className={`form-control ${emailAvailable === false ? 'border-red-500' : emailAvailable === true ? 'border-green-500' : ''}`}
              placeholder="Enter your email address"
              title="Email Address"
            />
            {emailChecking && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              </div>
            )}
            {emailAvailable === true && (
              <div className="absolute right-3 top-3 text-green-500">
                ✓
              </div>
            )}
            {emailAvailable === false && (
              <div className="absolute right-3 top-3 text-red-500">
                ✗
              </div>
            )}
          </div>
          {emailAvailable === false && (
            <p className="text-red-500 text-sm mt-1">This email is already registered</p>
          )}
          {emailAvailable === true && (
            <p className="text-green-500 text-sm mt-1">Email is available</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="form-control"
            placeholder="Create a password"
            title="Password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            className="form-control"
            placeholder="Confirm your password"
            title="Confirm Password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Account Type</label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
            className="form-control"
            title="Account Type"
          >
            <option value="user">Creative Professional</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="btn btn-primary">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <div key={index} className="alert alert-danger">
                {error.message}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
