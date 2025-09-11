import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [lastSignupEmail, setLastSignupEmail] = useState('')

  useEffect(() => {
    // Check if user is already logged in
    getCurrentUser()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: window.location.origin
        }
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Check your email for the confirmation link!')
        setLastSignupEmail(email)
        setEmail('')
        setPassword('')
        setFullName('')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    if (!lastSignupEmail) return
    setLoading(true)
    setMessage('')
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: lastSignupEmail,
        options: {
          emailRedirectTo: window.location.origin
        }
      })
      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Confirmation email re-sent. Please check your inbox.')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Successfully signed in!')
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Successfully signed out!')
    }
    setLoading(false)
  }

  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>🎉 Welcome, {user.user_metadata?.full_name || user.email}!</h2>
          <div className="user-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at).toLocaleString()}</p>
          </div>
          <button 
            onClick={handleSignOut} 
            disabled={loading}
            className="auth-button sign-out"
          >
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="auth-button"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        
        <div className="auth-switch">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="switch-button"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
        
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        {lastSignupEmail && message && message.includes('confirmation') && (
          <div className="auth-switch" style={{ marginTop: '0.75rem' }}>
            <button
              type="button"
              className="auth-button"
              onClick={handleResendConfirmation}
              disabled={loading}
            >
              {loading ? 'Resending…' : 'Resend confirmation email'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Auth


