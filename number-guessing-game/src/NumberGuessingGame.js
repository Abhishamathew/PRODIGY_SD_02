// NumberGuessingGame.js
import React, { useState } from 'react';
import './CSS/game.css';

const NumberGuessingGame = () => {
  const minNumber = 0;
  const maxNumber = 100;
  const [targetNumber, setTargetNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sliderColor, setSliderColor] = useState('#007bff'); // Initial color is blue

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleGuess = () => {
    const guess = parseInt(userGuess, 10);

    if (isNaN(guess)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === targetNumber) {
      setFeedback(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
      setShowCelebration(true);
      setSliderColor('#4caf50'); // Green for correct answer
    } else if (guess < targetNumber) {
      setFeedback('Too low. Try again.');
      setSliderColor('#ffeb3b'); // Yellow for too low
    } else {
      setFeedback('Too high. Try again.');
      setSliderColor('#f44336'); // Red for too high
    }
  };

  const handleNewNumber = () => {
    setTargetNumber(generateRandomNumber());
    setShowCelebration(false);
    setFeedback('');
    setAttempts(0);
  };

  function generateRandomNumber() {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  return (
    <div className="number-guessing-container">
        <div className="background">
      <button onClick={handleNewNumber} className="generate-button">Generate New Number</button>
      {targetNumber !== null && (
        <div className="locked-icon-container">
          <div className={`locked-icon ${showCelebration ? 'celebrate' : ''}`}>
            {showCelebration ? (
              <div className="celebration-animation">
                🎉{/* Add falling celebration animation here */}
              </div>
            ) : (
              <>
                <svg className="lock-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="random-number blur-background">{targetNumber}</span>
              </>
            )}
          </div>
        </div>
      )}
      <div className="input-container">
        <input type="number" value={userGuess} onChange={handleInputChange} min="0" max="100" />
        <button onClick={handleGuess} className="guess-button">Guess</button>
      </div>
      <div className="feedback-slider" style={{ width: `${attempts * 2}%`, backgroundColor: sliderColor }} />
      <p>{feedback}</p>
      </div>
    </div>
  );
};

export default NumberGuessingGame;
