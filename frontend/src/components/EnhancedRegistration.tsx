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
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="form-control"
            placeholder="Enter your email address"
            title="Email Address"
          />
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
