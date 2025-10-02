import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const LevelC2 = () => {
  const navigate = useNavigate()

  return (
    <div className="level-page">
      <Header />
      <main className="main">
        <div className="container">
          <div className="level-content">
            <button 
              onClick={() => navigate('/')}
              className="back-button"
              title="Retour à l'accueil"
            >
              🏠
            </button>
            <h2>Niveau C2 - Maîtrise</h2>
            <p>Contenu du niveau C2 à venir...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LevelC2
