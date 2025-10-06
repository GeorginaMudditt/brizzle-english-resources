import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Auth from './components/Auth'
import Home from './components/Home'
import LevelA1 from './components/LevelA1'
import LevelA2 from './components/LevelA2'
import LevelB1 from './components/LevelB1'
import LevelB2 from './components/LevelB2'
import LevelC1 from './components/LevelC1'
import LevelC2 from './components/LevelC2'
import Pricing from './components/Pricing'
import Vocabulary from './components/Vocabulary'
import Challenge from './components/Challenge'
import './App.css'

function App() {
  // One-time reset of saved challenge progress so ticks/icons are cleared
  useEffect(() => {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('challenge_'))
        .forEach((key) => localStorage.removeItem(key))
    } catch (_) {
      // ignore
    }
  }, [])

  return (
    <Router>
      <div className="App">
        {/* Navigation is handled in Header component */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={
            <>
              <Header />
              <main className="main">
                <div className="container">
                  <Home />
                </div>
              </main>
            </>
          } />
          
          {/* Auth route */}
          <Route path="/auth" element={
            <>
              <Header />
              <main className="main">
                <div className="container">
                  <Auth />
                </div>
              </main>
            </>
          } />
          
          {/* Level routes */}
          <Route path="/level/a1" element={
            <>
              <Header />
              <LevelA1 />
            </>
          } />
          <Route path="/level/a2" element={
            <>
              <Header />
              <LevelA2 />
            </>
          } />
          <Route path="/level/b1" element={
            <>
              <Header />
              <LevelB1 />
            </>
          } />
          <Route path="/level/b2" element={
            <>
              <Header />
              <LevelB2 />
            </>
          } />
          <Route path="/level/c1" element={
            <>
              <Header />
              <LevelC1 />
            </>
          } />
          <Route path="/level/c2" element={
            <>
              <Header />
              <LevelC2 />
            </>
          } />
          
          {/* Pricing route */}
          <Route path="/pricing" element={
            <>
              <Header />
              <Pricing />
            </>
          } />
          
          {/* Vocabulary routes */}
          <Route path="/level/:level/vocabulary" element={
            <>
              <Header />
              <Vocabulary />
            </>
          } />
          
          {/* Challenge routes */}
          <Route path="/level/:level/vocabulary/:topic/challenge/:challengeType" element={
            <>
              <Header />
              <Challenge />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
