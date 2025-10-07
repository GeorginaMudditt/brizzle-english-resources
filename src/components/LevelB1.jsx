import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SKILLS, LEVEL_COLORS } from '../constants/colors'

const LevelB1 = () => {
  const navigate = useNavigate()
  const levelColor = LEVEL_COLORS.B1

  const handleSkillClick = (skillId) => {
    if (skillId === 'vocabulary') {
      navigate('/level/b1/vocabulary')
    } else {
      console.log(`Skill ${skillId} clicked for B1 level`)
      // TODO: Navigate to other skill pages
    }
  }

  return (
    <div className="level-page">
      <main className="main">
        <div className="container">
          <div className="level-content">
            <h2>Niveau B1 - Intermédiaire</h2>
            
            <div className="skills-section">
              <div className="skills-grid">
                {SKILLS.map((skill) => (
                  <div 
                    key={skill.id}
                    className={`skill-card ${skill.id !== 'vocabulary' ? 'coming-soon' : ''}`}
                    style={{ borderColor: levelColor }}
                    onClick={() => handleSkillClick(skill.id)}
                    data-tooltip={skill.id !== 'vocabulary' ? 'Bientôt disponible' : undefined}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-description">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LevelB1
