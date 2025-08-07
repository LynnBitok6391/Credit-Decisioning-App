package com.creditdecision.creditdecisionapplication.controller;

import com.creditdecision.creditdecisionapplication.service.EmailValidationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class EmailCheckController {

    @Autowired
    private EmailValidationService emailValidationService;

    private static final Logger logger = LoggerFactory.getLogger(EmailCheckController.class);

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmailAvailability(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Normalize email for consistent checking
            String normalizedEmail = emailValidationService.normalizeEmail(email);
            
            // Perform the check
            boolean isAvailable = emailValidationService.isEmailAvailable(email);
            
            response.put("available", isAvailable);
            response.put("email", email);
            response.put("normalizedEmail", normalizedEmail);
            
            if (!isAvailable) {
                response.put("message", "This email address is already registered");
                response.put("reason", "EMAIL_EXISTS");
            } else {
                response.put("message", "Email address is available");
                response.put("reason", "AVAILABLE");
            }
            
            logger.info("Email availability check - Original: {}, Normalized: {}, Available: {}", 
                       email, normalizedEmail, isAvailable);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error checking email availability for: {}", email, e);
            response.put("available", false);
            response.put("message", "Error checking email availability");
            response.put("reason", "ERROR");
            return ResponseEntity.status(500).body(response);
        }
    }
}
