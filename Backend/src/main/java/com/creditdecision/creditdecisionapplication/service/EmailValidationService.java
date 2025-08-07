package com.creditdecision.creditdecisionapplication.service;

import com.creditdecision.creditdecisionapplication.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailValidationService {

    private static final Logger logger = LoggerFactory.getLogger(EmailValidationService.class);

    @Autowired
    private UserRepository userRepository;

    public boolean isEmailAvailable(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        String normalizedEmail = normalizeEmail(email);
        boolean exists = userRepository.existsByEmailIgnoreCaseAndTrim(normalizedEmail);
        
        // Log for debugging
        if (exists) {
            logger.warn("Email already exists in database: {}", normalizedEmail);
        }
        
        return !exists;
    }

    public String normalizeEmail(String email) {
        if (email == null) return "";
        // Remove leading/trailing spaces and convert to lowercase
        return email.trim().toLowerCase();
    }

    public boolean isValidEmailFormat(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        // Basic email format validation
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return email.trim().matches(emailRegex);
    }
}
