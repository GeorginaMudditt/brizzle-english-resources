import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...')
  const [error, setError] = useState(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test connection by getting the current user (this works even with empty database)
        const { data, error } = await supabase.auth.getUser()
        
        if (error) {
          // If auth fails, try a simple query to test connection
          const { error: queryError } = await supabase
            .from('_supabase_migrations')
            .select('*')
            .limit(1)
          
          if (queryError) {
            // This is expected if the table doesn't exist, but connection works
            if (queryError.code === 'PGRST116') {
              setConnectionStatus('✅ Connected to Supabase!')
              setError(null)
            } else {
              throw queryError
            }
          } else {
            setConnectionStatus('✅ Connected to Supabase!')
            setError(null)
          }
        } else {
          setConnectionStatus('✅ Connected to Supabase!')
          setError(null)
        }
      } catch (err) {
        setConnectionStatus('❌ Connection failed')
        setError(err.message)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="supabase-test">
      <h2>Supabase Connection Test</h2>
      <p><strong>Status:</strong> {connectionStatus}</p>
      {error && (
        <div className="error">
          <p><strong>Error:</strong> {error}</p>
          <p>Make sure to update your .env.local file with the correct Supabase credentials.</p>
        </div>
      )}
    </div>
  )
}

export default SupabaseTest
