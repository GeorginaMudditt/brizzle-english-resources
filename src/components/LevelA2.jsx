import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SKILLS, LEVEL_COLORS } from '../constants/colors'

const LevelA2 = () => {
  const navigate = useNavigate()
  const levelColor = LEVEL_COLORS.A2

  const handleSkillClick = (skillId) => {
    if (skillId === 'vocabulary') {
      navigate('/level/a2/vocabulary')
    } else {
      console.log(`Skill ${skillId} clicked for A2 level`)
      // TODO: Navigate to other skill pages
    }
  }

  return (
    <div className="level-page">
      <main className="main">
        <div className="container">
          <div className="level-content">
            <h2>Niveau A2 - Élémentaire</h2>
            
            <div className="skills-section">
              <div className="skills-grid">
                {SKILLS.map((skill) => (
                  <div 
                    key={skill.id}
                    className="skill-card"
                    style={{ borderColor: levelColor }}
                    onClick={() => handleSkillClick(skill.id)}
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

export default LevelA2
