import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SKILLS, LEVEL_COLORS } from '../constants/colors'

const LevelB2 = () => {
  const navigate = useNavigate()
  const levelColor = LEVEL_COLORS.B2

  const handleSkillClick = (skillId) => {
    console.log(`Skill ${skillId} clicked for B2 level`)
    // TODO: Navigate to skill page
  }

  return (
    <div className="level-page">
      <main className="main">
        <div className="container">
          <div className="level-content">
            <h2>Niveau B2 - Intermédiaire avancé</h2>
            
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

export default LevelB2
