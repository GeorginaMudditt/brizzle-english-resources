import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { LEVEL_COLORS } from '../constants/colors'

const Vocabulary = () => {
  const { level } = useParams()
  const navigate = useNavigate()

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

  const [topics, setTopics] = useState([]) // array of { name, count }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [topicToIcon, setTopicToIcon] = useState({})
  const [topicToFrench, setTopicToFrench] = useState({})

  // Get progress for a topic from localStorage
  const getTopicProgress = (topicName) => {
    const savedProgress = localStorage.getItem(`challenge_${level}_${topicName}`)
    if (savedProgress) {
      return JSON.parse(savedProgress)
    }
    return { bronze: false, silver: false, gold: false }
  }

  // Handle topic click - navigate to challenge selection
  const handleTopicClick = (topicName) => {
    const progress = getTopicProgress(topicName)
    const nextChallenge = !progress.bronze
      ? 'bronze'
      : !progress.silver
      ? 'silver'
      : 'gold'
    navigate(`/level/${level}/vocabulary/${encodeURIComponent(topicName)}/challenge/${nextChallenge}`)
  }

  // Get completion status for display
  const getCompletionStatus = (topicName) => {
    const progress = getTopicProgress(topicName)
    const completedCount = Object.values(progress).filter(Boolean).length
    return { progress, completedCount, allCompleted: completedCount === 3 }
  }

  // Get level color for styling
  const getLevelColor = () => {
    const levelMap = {
      'a1': LEVEL_COLORS.A1,
      'a2': LEVEL_COLORS.A2,
      'b1': LEVEL_COLORS.B1,
      'b2': LEVEL_COLORS.B2,
      'c1': LEVEL_COLORS.C1,
      'c2': LEVEL_COLORS.C2
    }
    return levelMap[level] || '#4A4A7D'
  }

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true)
      setError('')
      try {
        // Fetch distinct topic_page values from the A1 table
        const { data, error } = await supabase
          .from('Brizzle_A1_vocab')
          .select('topic_page')
          .order('topic_page', { ascending: true })

        if (error) throw error

        const rows = (data || []).filter((row) => !!row.topic_page)
        const topicToCount = new Map()
        const topicToOriginalName = new Map()
        
        for (const row of rows) {
          // Normalize the topic name for grouping: trim whitespace, remove extra spaces, lowercase
          const normalizedKey = row.topic_page.trim().replace(/\s+/g, ' ').toLowerCase()
          const originalName = row.topic_page.trim().replace(/\s+/g, ' ')
          
          // Store the count
          topicToCount.set(normalizedKey, (topicToCount.get(normalizedKey) || 0) + 1)
          // Store the original name (use the first occurrence as the display name)
          if (!topicToOriginalName.has(normalizedKey)) {
            topicToOriginalName.set(normalizedKey, originalName)
          }
        }
        
        const topicsWithCounts = Array.from(topicToCount.entries())
          .map(([normalizedName, count]) => ({ 
            name: topicToOriginalName.get(normalizedName), 
            count 
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        setTopics(topicsWithCounts)
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des thèmes')
      } finally {
        setLoading(false)
      }
    }

    if (level === 'a1') {
      fetchTopics()
    } else {
      setTopics([])
      setLoading(false)
    }
  }, [level])

  // Fetch completion icons and French translations for topics from Brizzle_A1_icons
  useEffect(() => {
    const fetchIconsAndFrench = async () => {
      try {
        const { data, error } = await supabase
          .from('Brizzle_A1_icons')
          .select('topic_page, icon, topic_french')

        if (error) throw error
        const iconMap = {}
        const frenchMap = {}
        ;(data || []).forEach(row => {
          if (row.topic_page) {
            if (row.icon) iconMap[row.topic_page] = row.icon
            if (row.topic_french) frenchMap[row.topic_page] = row.topic_french
          }
        })
        setTopicToIcon(iconMap)
        setTopicToFrench(frenchMap)
      } catch (err) {
        // non-fatal; icons and French translations are optional
      }
    }

    if (level === 'a1') fetchIconsAndFrench()
  }, [level])

  return (
    <div className="vocabulary-page">
      <main className="main">
        <div className="container">
          <div className="vocabulary-content">
            <div className="vocabulary-header">
              <h2 style={{ color: getLevelColor() }}>Vocabulaire - Niveau {getLevelDisplay(level)}</h2>
              <div className="levels-description">
                <p>🎯 Complétez trois défis (1, 2, 3) pour chaque thème.</p>
                <p>🧭 Vous pouvez compléter les thèmes dans n'importe quel ordre.</p>
                <p>🏆 L'objectif est d'apprendre tous les mots en terminant tous les défis.</p>
                <p>🎉 Amusez-vous en regardant votre tableau se remplir de récompenses !</p>
              </div>
            </div>

            <div className="vocabulary-grid">
              <div className="vocabulary-table-container">
                <table className="vocabulary-table">
                  <thead>
                    <tr style={{ backgroundColor: getLevelColor() }}>
                      <th>Thème</th>
                      <th className="col-count">Nombre de mots</th>
                      <th className="col-challenge">Défi 1</th>
                      <th className="col-challenge">Défi 2</th>
                      <th className="col-challenge">Défi 3</th>
                      <th className="col-completed">Terminé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan="6">Chargement...</td>
                      </tr>
                    )}
                    {error && !loading && (
                      <tr>
                        <td colSpan="6" style={{ color: '#C73E3E' }}>{error}</td>
                      </tr>
                    )}
                    {!loading && !error && topics.length === 0 && (
                      <tr>
                        <td colSpan="6">Aucun thème trouvé pour ce niveau pour le moment.</td>
                      </tr>
                    )}
                    {!loading && !error && topics.map((topic) => {
                      const { progress, completedCount, allCompleted } = getCompletionStatus(topic.name)
                      return (
                        <tr key={topic.name}>
                          <td 
                            className="topic-cell clickable"
                            onClick={() => handleTopicClick(topic.name)}
                            style={{ cursor: 'pointer' }}
                            title={topicToFrench[topic.name] || ''}
                          >
                            {topic.name}
                          </td>
                          <td className="count-cell">{topic.count}</td>
                          <td className="challenge-cell">
                            {progress.bronze ? (
                              <span className="challenge-complete">🏅</span>
                            ) : (
                              <span className="challenge-incomplete">○</span>
                            )}
                          </td>
                          <td className="challenge-cell">
                            {progress.silver ? (
                              <span className="challenge-complete">🏅</span>
                            ) : (
                              <span className="challenge-incomplete">○</span>
                            )}
                          </td>
                          <td className="challenge-cell">
                            {progress.gold ? (
                              <span className="challenge-complete">🏅</span>
                            ) : (
                              <span className="challenge-incomplete">○</span>
                            )}
                          </td>
                          <td className="completion-cell">
                            {allCompleted ? (
                              topicToIcon[topic.name] ? (
                                <img 
                                  src={topicToIcon[topic.name]} 
                                  alt={`Icône complété pour ${topic.name}`} 
                                  className="topic-complete-icon"
                                />
                              ) : (
                                <span className="all-complete">🏆</span>
                              )
                            ) : (
                              <span className="partial-complete">{completedCount}/3</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="download-banner">
                <a
                  href="/a1-vocabulary.pdf"
                  className="download-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <span className="download-icon" aria-hidden="true">⬇️</span>
                  <span>Télécharger la liste complète du vocabulaire A1</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Vocabulary
