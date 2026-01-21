-- Set admin role for your account
-- Update the email/username to match your account
UPDATE users SET role = 'admin' WHERE email = 'your_email@example.com';

-- Or if you prefer to set the first user as admin:
-- UPDATE users SET role = 'admin' WHERE id = 1;
