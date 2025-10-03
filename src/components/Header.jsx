import React from 'react'
import { Link } from 'react-router-dom'
import balloonLogo from '../assets/brizzle-balloon.png'

const Header = () => {
  return (
    <>
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
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '60px',
        backgroundColor: '#e0e2f3',
        zIndex: 999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        padding: '0.5rem 0'
      }}>
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/pricing" className="nav-link">Tarifs</Link>
      </div>
    </>
  )
}

export default Header
