package com.creditdecision.creditdecisionapplication.repository;

import com.creditdecision.creditdecisionapplication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE LOWER(TRIM(u.email)) = LOWER(TRIM(:email))")
    boolean existsByEmailIgnoreCaseAndTrim(@Param("email") String email);
    
    @Query("SELECT u FROM User u WHERE LOWER(TRIM(u.email)) = LOWER(TRIM(:email))")
    User findByEmailIgnoreCaseAndTrim(@Param("email") String email);
    
    // Keep the original method for backward compatibility
    User findByEmail(String email);
    
    // Additional method for debugging - count exact matches
    @Query("SELECT COUNT(u) FROM User u WHERE u.email = :email")
    long countByExactEmail(@Param("email") String email);
    
    // Method to find all similar emails for debugging
    @Query("SELECT u.email FROM User u WHERE LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))")
    java.util.List<String> findSimilarEmails(@Param("email") String email);
}
