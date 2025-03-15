import { useState } from 'react'
import './HomeScreen.css'

const HomeScreen = ({ startGame }) => {
  return (
    <div className="home-screen">
      <div className="home-content">
        <h1>The Ultimate Plant Parent!</h1>
        <p>How good of a plant parent are you? Test all of your planty knowledge here!</p>
        <button onClick={startGame} className="start-button">Start!</button>
      </div>
    </div>
  )
}

export default HomeScreen