
SELECT LOWER(TRIM(email)) as normalized_email, COUNT(*) as count
FROM users
GROUP BY LOWER(TRIM(email))
HAVING COUNT(*) > 1;

SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;


SELECT u1.id, u1.email, u1.first_name, u1.last_name, u1.created_at
FROM users u1
WHERE EXISTS (
    SELECT 1 
    FROM users u2 
    WHERE LOWER(TRIM(u2.email)) = LOWER(TRIM(u1.email)) 
    AND u2.id != u1.id
)
ORDER BY LOWER(TRIM(u1.email)), u1.created_at;


SELECT * FROM users 
WHERE email LIKE '%test%' 
   OR email LIKE '%example%' 
   OR email LIKE '%demo%'
ORDER BY created_at DESC;
