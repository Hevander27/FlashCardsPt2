import { useState } from 'react'
import './Card.css'

const Card = ({ question, answer, isFlipped, handleCardClick, onGuessSubmit }) => {
  const [userGuess, setUserGuess] = useState('')
  const [guessResult, setGuessResult] = useState(null) // null, 'correct', or 'incorrect'

  const handleInputChange = (e) => {
    setUserGuess(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation() // Prevent card flip when submitting

    // Check if the guess is correct (case insensitive)
    const isCorrect = userGuess.trim().toLowerCase() === answer.trim().toLowerCase()
    setGuessResult(isCorrect ? 'correct' : 'incorrect')
    
    // Send result to parent component
    onGuessSubmit(isCorrect)
  }

  // Reset the guess and result when we move to a new card
  const resetGuess = () => {
    setUserGuess('')
    setGuessResult(null)
  }

  // Allow the user to try again after an incorrect answer
  const handleTryAgain = (e) => {
    e.stopPropagation() // Prevent card flip
    setUserGuess('') // Clear the input
    setGuessResult(null) // Reset the result
  }

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card-inner">
        <div className="card-front">
          <p>{question}</p>
          
          <form className="guess-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={userGuess}
              onChange={handleInputChange}
              placeholder="Enter your answer..."
              className={`guess-input ${guessResult ? `guess-${guessResult}` : ''}`}
              disabled={isFlipped || guessResult === 'correct'}
            />
            
            {guessResult && (
              <div className={`feedback feedback-${guessResult}`}>
                {guessResult === 'correct' ? 'Correct!' : 'Incorrect!'}
              </div>
            )}
            
            {guessResult === 'incorrect' && !isFlipped ? (
              <div className="button-group">
                <button 
                  type="button" 
                  className="try-again-btn"
                  onClick={handleTryAgain}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <button 
                type="submit" 
                className="submit-guess-btn"
                disabled={isFlipped || guessResult === 'correct' || !userGuess.trim()}
              >
                Submit
              </button>
            )}
          </form>
        </div>
        <div className="card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default Card