import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { LEVEL_COLORS } from '../constants/colors'

const Challenge = () => {
  const { level, topic, challengeType } = useParams()
  const navigate = useNavigate()
  const [progress, setProgress] = useState({
    bronze: false,
    silver: false,
    gold: false
  })
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [draggedWord, setDraggedWord] = useState(null)
  const [wordPositions, setWordPositions] = useState({})
  const [shuffledWords, setShuffledWords] = useState([])
  const [listenedWords, setListenedWords] = useState(new Set())

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`challenge_${level}_${topic}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [level, topic])

  // Fetch words for bronze, silver and gold challenges
  useEffect(() => {
    const fetchWords = async () => {
      if ((challengeType === 'bronze' || challengeType === 'silver' || challengeType === 'gold') && level === 'a1') {
        setLoading(true)
        setError('')
        try {
          const { data, error } = await supabase
            .from('Brizzle_A1_vocab')
            .select('word_english, pron_english, translation_french, created_at, id')
            .eq('topic_page', topic)

          if (error) throw error
          const sorted = (data || []).slice().sort((a, b) => {
            if (a.created_at && b.created_at) {
              return new Date(a.created_at) - new Date(b.created_at)
            }
            if (a.id !== undefined && b.id !== undefined) {
              return String(a.id).localeCompare(String(b.id))
            }
            return 0
          })
          setWords(sorted)
          
          // For silver challenge, create shuffled English words
          if (challengeType === 'silver' && data) {
            const englishWords = (sorted.length ? sorted : data).map(item => item.word_english)
            const shuffled = [...englishWords].sort(() => Math.random() - 0.5)
            setShuffledWords(shuffled)
            setWordPositions({})
          }
          
          // For gold challenge, we just need the sorted list; inputs handled separately
        } catch (err) {
          setError(err.message || 'Erreur lors du chargement des mots')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchWords()
  }, [level, topic, challengeType])

  // Save progress to localStorage
  const saveProgress = (newProgress) => {
    localStorage.setItem(`challenge_${level}_${topic}`, JSON.stringify(newProgress))
    setProgress(newProgress)
  }

  const completeChallenge = () => {
    // For bronze challenge, ensure all audio have been listened to at least once
    if (challengeType === 'bronze') {
      if (words.length === 0 || listenedWords.size < words.length) {
        alert('Veuillez écouter tous les mots au moins une fois avant de continuer.')
        return
      }
    }
    // For silver challenge, check if all words are correctly positioned
    if (challengeType === 'silver') {
      const allCorrect = words.every(word => 
        wordPositions[word.translation_french] === word.word_english
      )
      if (!allCorrect) {
        alert("Oups, vous avez fait quelques erreurs. Veuillez réessayer. Chaque mot anglais doit être associé correctement au mot français correspondant pour terminer ce défi. Bonne chance !")
        return
      }
    }
    
    // For gold challenge, validate typed answers (strict match)
    if (challengeType === 'gold') {
      const allCorrect = words.every(word => {
        const userRaw = goldInputs[word.translation_french] || ''
        const user = userRaw.replace(/\s+/g, ' ').trim() // tolerate extra spaces only
        return user === word.word_english
      })
      if (!allCorrect) {
        alert("Oups, vous avez fait quelques erreurs. Veuillez réessayer. Chaque mot anglais doit être orthographié et ponctué correctement pour terminer ce défi. Bonne chance !")
        return
      }
    }
    
    const newProgress = { ...progress, [challengeType]: true }
    saveProgress(newProgress)

    // Show success popup then navigate
    alert(`Félicitations ! Vous avez terminé avec succès le défi ${getChallengeTitle(challengeType).toLowerCase()} sur le thème « ${topic} ».`)

    setTimeout(() => {
      if (challengeType === 'bronze') {
        navigate(`/level/${level}/vocabulary/${encodeURIComponent(topic)}/challenge/silver`)
      } else if (challengeType === 'silver') {
        navigate(`/level/${level}/vocabulary/${encodeURIComponent(topic)}/challenge/gold`)
      } else {
        navigate(`/level/${level}/vocabulary`)
      }
    }, 1000)
  }

  // Play audio for pronunciation
  const playAudio = (audioUrl, wordKey) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play()
        .then(() => {
          if (wordKey) {
            setListenedWords(prev => new Set(prev).add(wordKey))
          }
        })
        .catch(err => console.log('Audio playback failed:', err))
    }
  }

  // Drag and drop functions for silver challenge
  const handleDragStart = (e, word) => {
    setDraggedWord(word)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, frenchTranslation) => {
    e.preventDefault()
    if (!draggedWord) return

    setWordPositions(prev => {
      const newPositions = { ...prev }

      // If this drop zone already had a word, return it to the pool
      const wordBeingReplaced = newPositions[frenchTranslation]
      if (wordBeingReplaced) {
        setShuffledWords(prevPool => (
          prevPool.includes(wordBeingReplaced) ? prevPool : [...prevPool, wordBeingReplaced]
        ))
      }

      // Remove the dragged word from any previous drop zone
      for (const key of Object.keys(newPositions)) {
        if (newPositions[key] === draggedWord) {
          delete newPositions[key]
          break
        }
      }

      // Place the dragged word in the current drop zone
      newPositions[frenchTranslation] = draggedWord

      // Remove the dragged word from the pool on the right
      setShuffledWords(prevPool => prevPool.filter(w => w !== draggedWord))

      return newPositions
    })

    setDraggedWord(null)
  }

  const removeWord = (frenchTranslation) => {
    setWordPositions(prev => {
      const newPositions = { ...prev }
      const removed = newPositions[frenchTranslation]
      delete newPositions[frenchTranslation]
      if (removed) {
        // Return the word to the pool on the right (avoid duplicates)
        setShuffledWords(prevPool => (
          prevPool.includes(removed) ? prevPool : [...prevPool, removed]
        ))
      }
      return newPositions
    })
  }

  const getChallengeColor = (type) => {
    const colors = {
      bronze: '#cd7f31',
      silver: '#c0c0c0', 
      gold: '#ffd700'
    }
    return colors[type] || '#4A4A7D'
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

  const getChallengeTitle = (type) => {
    const titles = {
      bronze: 'Défi Bronze',
      silver: 'Défi Argent',
      gold: 'Défi Or'
    }
    return titles[type] || 'Défi'
  }

  const isCompleted = progress[challengeType]

  // State for gold inputs
  const [goldInputs, setGoldInputs] = useState({})
  const goldShuffled = React.useMemo(() => {
    if (challengeType !== 'gold' || !words?.length) return []
    const list = [...words]
    return list.sort(() => Math.random() - 0.5)
  }, [challengeType, words])

  const handleGoldInput = (french, value) => {
    setGoldInputs(prev => ({ ...prev, [french]: value }))
  }


  return (
    <div className="challenge-page">
      <main className="main">
        <div className="container">
          <div className="challenge-content">
            <div className="challenge-header">
              <button 
                className="back-button"
                onClick={() => navigate(`/level/${level}/vocabulary`)}
              >
                ← Retour au vocabulaire
              </button>
              
              <h2 style={{ color: getLevelColor() }}>{getChallengeTitle(challengeType)} - {topic}</h2>
              {challengeType !== 'bronze' && challengeType !== 'silver' && challengeType !== 'gold' && (
                <p className="challenge-description">
                  Niveau {level?.toUpperCase()} • {topic}
                </p>
              )}
            </div>

            <div className="challenge-body">
              {isCompleted ? null : (
                <div className="challenge-content-area">
                  {challengeType === 'bronze' ? (
                    <div className="bronze-challenge">
                      <div className="challenge-instructions">
                        <h3 style={{ color: getLevelColor() }}>Écoutez et lisez tous les mots</h3>
                        <p>Cliquez sur l'icône 🔊 pour écouter la prononciation de chaque mot anglais, puis lisez la traduction française.</p>
                      </div>
                      
                      {loading && <div className="loading">Chargement des mots...</div>}
                      {error && <div className="error">Erreur : {error}</div>}
                      
                      {!loading && !error && words.length > 0 && (
                        <div className="words-list">
                          {words.map((word, index) => (
                            <div key={index} className="word-item">
                              <div className="word-english">
                                <span className="word-text">{word.word_english}</span>
                                <button 
                                  className="audio-button"
                                  onClick={() => playAudio(word.pron_english, word.word_english)}
                                  title="Écouter la prononciation"
                                  style={{ backgroundColor: getLevelColor() }}
                                >
                                  🔊
                                </button>
                              </div>
                              <div className="word-translation">
                                {word.translation_french}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {!loading && !error && words.length === 0 && (
                        <div className="no-words">Aucun mot trouvé pour ce thème.</div>
                      )}
                      
                      <div className="challenge-actions">
                        <button 
                          className="challenge-button"
                          onClick={completeChallenge}
                          style={{ backgroundColor: getLevelColor() }}
                          disabled={words.length === 0 || listenedWords.size < words.length}
                        >
                          Terminer le défi Bronze
                        </button>
                      </div>
                    </div>
                  ) : challengeType === 'silver' ? (
                    <div className="silver-challenge">
                      <div className="challenge-instructions">
                        <h3 style={{ color: getLevelColor() }}>Associez les mots</h3>
                        <p>Glissez les mots anglais (cartes colorées) vers les cases à côté de leur traduction française correspondante. Pour renvoyer une carte colorée vers la liste de droite, cliquez simplement dessus.</p>
                      </div>
                      
                      {loading && <div className="loading">Chargement des mots...</div>}
                      {error && <div className="error">Erreur : {error}</div>}
                      
                      {!loading && !error && words.length > 0 && (
                        <div className="silver-game">
                          <div className="french-words-section">
                            <div className="french-words-list">
                              {words.map((word, index) => (
                                <div key={index} className="french-word-item">
                                  <div className="french-word">{word.translation_french}</div>
                                  <div 
                                    className="drop-zone"
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, word.translation_french)}
                                  >
                                    {wordPositions[word.translation_french] ? (
                                      <div 
                                        className="dropped-word"
                                        onClick={() => removeWord(word.translation_french)}
                                        title="Cliquer pour retirer"
                                      >
                                        {wordPositions[word.translation_french]}
                                      </div>
                                    ) : (
                                      <div className="drop-placeholder">Glissez ici</div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="english-words-section">
                            <div className="english-words-grid">
                              {shuffledWords.map((word, index) => (
                                <div 
                                  key={index}
                                  className="english-word-card"
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, word)}
                                  style={{ backgroundColor: getLevelColor() }}
                                >
                                  {word}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {!loading && !error && words.length === 0 && (
                        <div className="no-words">Aucun mot trouvé pour ce thème.</div>
                      )}
                      
                      <div className="challenge-actions">
                        <button 
                          className="challenge-button"
                          onClick={completeChallenge}
                          style={{ backgroundColor: getLevelColor() }}
                        >
                          Terminer le défi Argent
                        </button>
                      </div>
                    </div>
                  ) : challengeType === 'gold' ? (
                    <div className="gold-challenge">
                      <div className="challenge-instructions">
                        <h3 style={{ color: getLevelColor() }}>Écrivez les mots en anglais</h3>
                        <p>Pour chaque mot français, tapez le mot anglais correspondant dans la case. L'orthographe et la ponctuation doivent être exactes.</p>
                      </div>

                      {loading && <div className="loading">Chargement des mots...</div>}
                      {error && <div className="error">Erreur : {error}</div>}

                      {!loading && !error && goldShuffled.length > 0 && (
                        <div className="gold-list">
                          {goldShuffled.map((word, index) => (
                            <div key={index} className="gold-item">
                              <div className="gold-french">{word.translation_french}</div>
                              <input
                                type="text"
                                className="gold-input"
                                placeholder="Mot en anglais"
                                value={goldInputs[word.translation_french] || ''}
                                onChange={(e) => handleGoldInput(word.translation_french, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {!loading && !error && goldShuffled.length === 0 && (
                        <div className="no-words">Aucun mot trouvé pour ce thème.</div>
                      )}

                      <div className="challenge-actions">
                        <button 
                          className="challenge-button"
                          onClick={completeChallenge}
                          style={{ backgroundColor: getLevelColor() }}
                        >
                          Terminer le défi Or
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="challenge-placeholder">
                      <h3>Contenu du défi</h3>
                      <p>Ici s'affichera le contenu du défi {challengeType}.</p>
                      <p>Thème : {topic}</p>
                      <p>Niveau : {level?.toUpperCase()}</p>
                      
                      <button 
                        className="challenge-button"
                        onClick={completeChallenge}
                        style={{ backgroundColor: getChallengeColor(challengeType) }}
                      >
                        Terminer le défi {getChallengeTitle(challengeType).split(' ')[1]}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Challenge
