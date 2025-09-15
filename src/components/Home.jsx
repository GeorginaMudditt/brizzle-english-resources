import React from 'react'
import { LEVELS } from '../constants/colors'

const Home = () => {
  const handleLevelClick = (levelId) => {
    console.log(`Niveau ${levelId} sélectionné`)
    // TODO: Navigate to level page
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <div className="levels-section">
          <h2>Choisissez votre niveau</h2>
          <p className="levels-description">
            Sélectionnez le niveau qui correspond le mieux à vos compétences actuelles en anglais
          </p>
          
          <div className="progress-bar">
            <div className="progress-segment a1">A1</div>
            <div className="progress-segment a2">A2</div>
            <div className="progress-segment b1">B1</div>
            <div className="progress-segment b2">B2</div>
            <div className="progress-segment c1">C1</div>
            <div className="progress-segment c2">C2</div>
          </div>
          
          <div className="levels-grid">
            {LEVELS.map((level) => (
              <div 
                key={level.id}
                className="level-card"
                style={{ '--level-color': level.color }}
                onClick={() => handleLevelClick(level.id)}
              >
                <div className="level-header">
                  <div className="level-id">{level.id} :</div>
                  <h3 className="level-name">{level.name}</h3>
                </div>
                <p className="level-description">{level.description}</p>
                <div className="level-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="cecrl-section">
          <h3>Comment puis-je connaître mon niveau CECRL (Cadre européen commun de référence pour les langues) ?</h3>
          <p>
            Lisez la Grille d'auto-évaluation -{' '}
            <a 
              href="https://rm.coe.int/CoERMPublicCommonSearchServices/DisplayDCTMContent?documentId=090000168045bb57" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cecrl-link"
            >
              en français
            </a>
            {' '}ou{' '}
            <a 
              href="https://rm.coe.int/CoERMPublicCommonSearchServices/DisplayDCTMContent?documentId=090000168045bb52" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cecrl-link"
            >
              en anglais
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
