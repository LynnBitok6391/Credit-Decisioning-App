-- Fix user table structure for proper registration
-- MySQL compatible fixes for unlimited user registration

-- Step 1: Modify ID to auto-increment (MySQL syntax)
ALTER TABLE users 
MODIFY COLUMN id INT AUTO_INCREMENT;

-- Step 2: Set auto-increment starting value
ALTER TABLE users AUTO_INCREMENT = 4;

-- Step 3: Add unique constraint on email
ALTER TABLE users 
ADD CONSTRAINT unique_email UNIQUE (email);

-- Step 4: Add not null constraints
ALTER TABLE users 
MODIFY COLUMN email VARCHAR(255) NOT NULL,
MODIFY COLUMN password VARCHAR(255) NOT NULL;

-- Step 5: Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Step 6: Verify current table structure
DESCRIBE users;

-- Step 7: Check current users
SELECT * FROM users;

-- Step 8: Test new user insertion (optional)
-- INSERT INTO users (email, name, password, role) 
-- VALUES ('test@example.com', 'Test User', '$2a$10$testhashedpassword', 'user');
