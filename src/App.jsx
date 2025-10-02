import React from 'react'
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
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
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
          <Route path="/level/a1" element={<LevelA1 />} />
          <Route path="/level/a2" element={<LevelA2 />} />
          <Route path="/level/b1" element={<LevelB1 />} />
          <Route path="/level/b2" element={<LevelB2 />} />
          <Route path="/level/c1" element={<LevelC1 />} />
          <Route path="/level/c2" element={<LevelC2 />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
