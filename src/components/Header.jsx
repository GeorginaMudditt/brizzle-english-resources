import React from 'react'
import balloonLogo from '../assets/brizzle-balloon.png'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <img
            className="hot-air-balloon-img"
            src={balloonLogo}
            alt="Brizzle hot air balloon logo"
          />
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
