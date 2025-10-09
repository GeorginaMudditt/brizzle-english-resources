-- ========================================
-- SUPABASE AUTHENTICATION SETUP
-- ========================================
-- This script sets up the database tables needed for authentication
-- Run this in your Supabase Dashboard > SQL Editor

-- ========================================
-- 1. CREATE PROFILES TABLE
-- ========================================
-- This table stores additional user information beyond Supabase's built-in auth
CREATE TABLE IF NOT EXISTS public.profiles (
    -- Primary key that links to Supabase auth.users
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    
    -- User's display name (what they want to be called)
    full_name TEXT,
    
    -- User's username (unique identifier for @mentions, etc.)
    username TEXT UNIQUE,
    
    -- User's avatar/profile picture URL
    avatar_url TEXT,
    
    -- User's bio/description
    bio TEXT,
    
    -- User's website URL
    website TEXT,
    
    -- User's location
    location TEXT,
    
    -- When this profile was created
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- When this profile was last updated
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================
-- This ensures users can only see/edit their own data
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 3. CREATE SECURITY POLICIES
-- ========================================

-- Policy: Users can view all profiles (for public profiles)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Policy: Users can delete their own profile
CREATE POLICY "Users can delete their own profile" 
ON public.profiles FOR DELETE 
USING (auth.uid() = id);

-- ========================================
-- 4. CREATE FUNCTION TO HANDLE NEW USER SIGNUP
-- ========================================
-- This function automatically creates a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 5. CREATE TRIGGER FOR NEW USER SIGNUP
-- ========================================
-- This trigger runs the function above when a new user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- 6. CREATE FUNCTION TO UPDATE UPDATED_AT TIMESTAMP
-- ========================================
-- This function automatically updates the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- 7. CREATE TRIGGER FOR UPDATED_AT TIMESTAMP
-- ========================================
-- This trigger runs the function above when a profile is updated
CREATE OR REPLACE TRIGGER on_profile_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();












