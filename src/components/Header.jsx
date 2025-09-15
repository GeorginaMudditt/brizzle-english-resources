import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <div className="hot-air-balloon" aria-label="Brizzle logo">
            <img
              className="hot-air-balloon-img"
              src="/brizzle-balloon.png"
              alt="Brizzle hot air balloon logo"
              loading="eager"
              decoding="async"
              onError={(e) => {
                console.log('Image failed to load, trying alternative path');
                e.target.src = './brizzle-balloon.png';
              }}
            />
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
