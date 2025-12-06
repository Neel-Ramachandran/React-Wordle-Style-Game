import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Word lists for each category
const WORD_LISTS = {
  food: ['APPLE', 'BREAD', 'PIZZA', 'PASTA', 'SALAD', 'STEAK', 'CURRY', 'BACON', 'RICE', 'BEANS', 'PEACH', 'GRAPE', 'MANGO', 'MELON', 'BERRY'],
  sports: ['TENNIS', 'RUGBY', 'SOCCER', 'BOXING', 'TRACK', 'FIELD', 'SKATE', 'SWIM', 'CYCLE', 'VAULT', 'PITCH', 'MATCH', 'RELAY', 'SERVE', 'COACH'],
  animals: ['TIGER', 'HORSE', 'ZEBRA', 'KOALA', 'PANDA', 'SHEEP', 'WHALE', 'SHARK', 'EAGLE', 'RAVEN', 'SNAKE', 'MOUSE', 'BUNNY', 'OTTER', 'LEMUR'],
  countries: ['CHINA', 'JAPAN', 'SPAIN', 'ITALY', 'CHILE', 'EGYPT', 'KENYA', 'GHANA', 'INDIA', 'MALTA', 'NEPAL', 'QATAR', 'SAMOA', 'TONGA', 'WALES'],
  family: ['MOTHER', 'FATHER', 'UNCLE', 'AUNTY', 'SISTER', 'BROTHER', 'NIECE', 'CHILD', 'GRAND', 'TWINS', 'DADDY', 'MOMMY', 'ELDER', 'YOUTH', 'FOLKS']
};

function App() {
  // State variables to manage the game
  const [screen, setScreen] = useState('category'); // Which screen to show: category, game, win, or lose
  const [category, setCategory] = useState(''); // Selected category
  const [targetWord, setTargetWord] = useState(''); // The word to guess
  const [guesses, setGuesses] = useState([]); // Array of previous guesses
  const [currentGuess, setCurrentGuess] = useState(''); // Current word being typed
  const [gameOver, setGameOver] = useState(false); // Whether the game has ended

  // Function called when user selects a category
  const selectCategory = (cat) => {
    setCategory(cat);
    let wordList;
    
    // If random, combine all word lists
    if (cat === 'random') {
      const allWords = Object.values(WORD_LISTS).flat();
      wordList = allWords;
    } else {
      wordList = WORD_LISTS[cat];
    }
    
    // Pick a random word from the list
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(randomWord);
    setScreen('game');
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
  };

  // Handle keyboard input during the game
  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;
    
    // When Enter is pressed and word is 5 letters
    if (e.key === 'Enter' && currentGuess.length === 5) {
      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      
      // Check if the guess is correct
      if (currentGuess.toUpperCase() === targetWord) {
        setScreen('win');
        setGameOver(true);
      } else if (newGuesses.length >= 6) {
        // Out of guesses
        setScreen('lose');
        setGameOver(true);
      }
      
      setCurrentGuess('');
    } else if (e.key === 'Backspace') {
      // Delete last letter
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (e.key.length === 1 && e.key.match(/[a-z]/i) && currentGuess.length < 5) {
      // Add letter to current guess
      setCurrentGuess(currentGuess + e.key.toUpperCase());
    }
  }, [gameOver, currentGuess, guesses, targetWord]);

  // Reset game and go back to category selection
  const playAgain = () => {
    setScreen('category');
    setCategory('');
    setTargetWord('');
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
  };

  // Determine the color class for each letter box
  const getLetterClass = (letter, index) => {
    if (targetWord[index] === letter) {
      return 'letter-box correct'; // Green: correct position
    } else if (targetWord.includes(letter)) {
      return 'letter-box present'; // Yellow: wrong position
    } else {
      return 'letter-box absent'; // Gray: not in word
    }
  };

  // Listen for keyboard events when on game screen
  useEffect(() => {
    if (screen === 'game') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [screen, handleKeyPress]);

  // Category Selection Screen
  if (screen === 'category') {
    return (
      <div className="app-container">
        <div className="card">
          <h1 className="title">NEELE</h1>
          <p className="subtitle">Select a Category</p>
          
          <div className="category-grid">
            <button onClick={() => selectCategory('food')} className="category-btn">
              🍕 Food
            </button>
            <button onClick={() => selectCategory('sports')} className="category-btn sports">
              ⚽ Sports
            </button>
            <button onClick={() => selectCategory('animals')} className="category-btn animals">
              🐾 Animals
            </button>
            <button onClick={() => selectCategory('countries')} className="category-btn countries">
              🌍 Countries
            </button>
            <button onClick={() => selectCategory('family')} className="category-btn family">
              👨‍👩‍👧 Family
            </button>
            <button onClick={() => selectCategory('random')} className="category-btn random">
              🎲 Random
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Screen
  if (screen === 'game') {
    return (
      <div className="app-container">
        <div className="card game-card">
          <h1 className="game-title">NEELE</h1>
          <p className="game-category">Category: {category}</p>
          
          <div className="guesses-container">
            {/* Create 6 rows for guesses */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="guess-row">
                {/* Create 5 letter boxes per row */}
                {[...Array(5)].map((_, j) => {
                  const guess = guesses[i];
                  const letter = guess ? guess[j] : (i === guesses.length ? currentGuess[j] : '');
                  const isGuessed = i < guesses.length;
                  
                  return (
                    <div
                      key={j}
                      className={
                        isGuessed
                          ? getLetterClass(guess[j], j)
                          : letter
                          ? 'letter-box active'
                          : 'letter-box'
                      }
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          <p className="instruction">Type your guess and press Enter</p>
        </div>
      </div>
    );
  }

  // Win Screen
  if (screen === 'win') {
    return (
      <div className="result-container win">
        <div className="result-card">
          <div className="emoji">🎉</div>
          <h1 className="result-title win">YOU WIN!</h1>
          <p className="result-text">The word was:</p>
          <p className="result-word">{targetWord}</p>
          <p className="result-tries">You guessed it in {guesses.length} tries!</p>
          <button onClick={playAgain} className="play-again-btn win">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // Lose Screen
  if (screen === 'lose') {
    return (
      <div className="result-container lose">
        <div className="result-card">
          <div className="emoji">😔</div>
          <h1 className="result-title lose">YOU LOSE!</h1>
          <p className="result-text">The word was:</p>
          <p className="result-word">{targetWord}</p>
          <button onClick={playAgain} className="play-again-btn lose">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;