import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <div className="hot-air-balloon" aria-label="Brizzle logo">
            <svg
              className="hot-air-balloon-img"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Balloon envelope */}
              <ellipse cx="40" cy="35" rx="25" ry="30" fill="url(#balloonGradient)" />
              {/* Balloon basket */}
              <rect x="35" y="60" width="10" height="8" rx="2" fill="#8B4513" />
              {/* Ropes */}
              <line x1="35" y1="60" x2="30" y2="65" stroke="#333" strokeWidth="1" />
              <line x1="45" y1="60" x2="50" y2="65" stroke="#333" strokeWidth="1" />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="balloonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff595e" />
                  <stop offset="50%" stopColor="#1a82c4" />
                  <stop offset="100%" stopColor="#ff595e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="brand-text">
          <h1>Brizzle</h1>
          <h2>Ressources pour apprendre l'anglais</h2>
        </div>
      </div>
    </header>
  )
}

export default Header
