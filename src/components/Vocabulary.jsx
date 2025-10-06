import React from 'react'
import { useParams } from 'react-router-dom'

const Vocabulary = () => {
  const { level } = useParams()

  // Convert level parameter to display format
  const getLevelDisplay = (level) => {
    const levelMap = {
      'a1': 'A1',
      'a2': 'A2', 
      'b1': 'B1',
      'b2': 'B2',
      'c1': 'C1',
      'c2': 'C2'
    }
    return levelMap[level] || level?.toUpperCase()
  }

  return (
    <div className="vocabulary-page">
      <main className="main">
        <div className="container">
          <div className="vocabulary-content">
            <div className="vocabulary-header">
              <h2>Vocabulaire - Niveau {getLevelDisplay(level)}</h2>
              <p className="levels-description">Découvrez et apprenez le vocabulaire essentiel pour le niveau {getLevelDisplay(level)}</p>
            </div>

            <div className="vocabulary-grid">
              {/* Placeholder for vocabulary content */}
              <div className="vocabulary-section">
                <h3>Contenu à venir</h3>
                <p>Le contenu du vocabulaire sera ajouté ici prochainement.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Vocabulary
