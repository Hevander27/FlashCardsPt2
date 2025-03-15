import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import HomeScreen from './components/HomeScreen'
import plantData from './data/plantData'

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [guessResult, setGuessResult] = useState(null) // track current guess result
  const [cards, setCards] = useState([...plantData]) // Use a copy of the plant data so we can shuffle it
  
  const totalCards = cards.length
  
  const handleCardClick = () => {
    // Allow flipping the card anytime
    setIsFlipped(!isFlipped)
  }
  
  const handleGuessSubmit = (isCorrect) => {
    setGuessResult(isCorrect)
    // Automatically flip the card after a correct guess
    if (isCorrect) {
      setTimeout(() => {
        setIsFlipped(true)
      }, 1000)
    }
  }
  
  const getNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1)
    } else {
      // Loop back to the first card if we're at the end
      setCurrentCardIndex(0)
    }
    resetCardState()
  }
  
  const getPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1)
    } else {
      // Loop to the last card if we're at the beginning
      setCurrentCardIndex(cards.length - 1)
    }
    resetCardState()
  }
  
  const shuffleCards = () => {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
    setCurrentCardIndex(0); // Reset to the first card of the shuffled deck
    resetCardState();
  }
  
  const resetCardState = () => {
    setIsFlipped(false)
    setGuessResult(null)
  }
  
  const startGame = () => {
    setGameStarted(true)
  }

  return (
    <div className="App">
      {!gameStarted ? (
        <HomeScreen startGame={startGame} />
      ) : (
        <>
          <div className="header">
            <h1>The Ultimate Plant Parent!</h1>
            <p>How good of a plant parent are you? Test all of your planty knowledge here!</p>
            <p>Card {currentCardIndex + 1} of {totalCards}</p>
          </div>
          
          <div className="card-container">
            <Card 
              question={cards[currentCardIndex].question} 
              answer={cards[currentCardIndex].answer}
              isFlipped={isFlipped}
              handleCardClick={handleCardClick}
              onGuessSubmit={handleGuessSubmit}
            />
          </div>
          
          <div className="controls">
            <button className="shuffle-button" onClick={shuffleCards}>
              <span className="shuffle-icon">🔀</span>
              Shuffle
            </button>
          </div>
          
          <div className="navigation">
            <button className="nav-button prev-button" onClick={getPrevCard}>←</button>
            <button className="nav-button next-button" onClick={getNextCard}>→</button>
          </div>
        </>
      )}
    </div>
  )
}

export default App