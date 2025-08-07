-- Fix user table structure for proper registration
-- Add auto-increment and unique constraints

-- Step 1: Create sequence for auto-increment
CREATE SEQUENCE IF NOT EXISTS user_id_seq START WITH 4 INCREMENT BY 1;

-- Step 2: Alter table to use auto-increment
ALTER TABLE users 
ALTER COLUMN id SET DEFAULT nextval('user_id_seq');

-- Step 3: Add unique constraint on email
ALTER TABLE users 
ADD CONSTRAINT unique_email UNIQUE (email);

-- Step 4: Add not null constraints
ALTER TABLE users 
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN password SET NOT NULL;

-- Step 5: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Step 6: Insert test users (optional)
-- INSERT INTO users (email, name, password, role) 
-- VALUES ('test@example.com', 'Test User', '$2a$10$testhashedpassword', 'user');
