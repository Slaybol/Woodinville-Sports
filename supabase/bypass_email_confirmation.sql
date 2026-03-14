-- Development ONLY: Bypass email confirmation for testing
-- WARNING: Only use in development environment!

-- Update auth config to disable email confirmation
UPDATE auth.config
SET 
  enable_email_confirmations = false,
  enable_signup = true;

-- This allows users to sign in immediately without email verification
-- REVERT THIS BEFORE PRODUCTION DEPLOYMENT!
