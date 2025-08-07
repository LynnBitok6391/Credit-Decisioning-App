-- Database cleanup script to fix registration issues
-- This script will help identify and resolve duplicate email issues

USE creditdecisiondb;

-- Check current users
SELECT 'Current users in database:' as message;
SELECT id, email, name, role, created_at FROM user ORDER BY created_at DESC;

-- Check for duplicate emails (case-insensitive)
SELECT 'Duplicate emails found:' as message;
SELECT LOWER(TRIM(email)) as normalized_email, COUNT(*) as count
FROM user 
GROUP BY LOWER(TRIM(email)) 
HAVING COUNT(*) > 1;

-- Check for any test data that might be causing issues
SELECT 'Test users (if any):' as message;
SELECT id, email, name, role FROM user WHERE email LIKE '%test%' OR email LIKE '%example%';

-- Clean up duplicate emails (keep the most recent)
-- WARNING: Only run this if you're sure you want to remove duplicates
-- DELETE u1 FROM user u1
-- INNER JOIN user u2 
-- WHERE u1.id < u2.id 
-- AND LOWER(TRIM(u1.email)) = LOWER(TRIM(u2.email));

-- Check email uniqueness after cleanup
SELECT 'Email uniqueness check:' as message;
SELECT COUNT(DISTINCT LOWER(TRIM(email))) as unique_emails, COUNT(*) as total_emails FROM user;

-- Reset auto-increment if needed
-- ALTER TABLE user AUTO_INCREMENT = 1;
