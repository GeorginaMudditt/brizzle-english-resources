import React, { useState } from 'react'
import Header from './components/Header'
import Auth from './components/Auth'
import Home from './components/Home'
import './App.css'

function App() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="container">
          {/* Dev toggle - remove this when auth is working */}
          <div className="dev-toggle" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <button 
              onClick={() => setShowAuth(!showAuth)}
              style={{
                background: '#38448F',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {showAuth ? 'Show Home Page' : 'Show Auth Page (Dev)'}
            </button>
          </div>
          
          {showAuth ? <Auth /> : <Home />}
        </div>
      </main>
    </div>
  )
}

export default App
