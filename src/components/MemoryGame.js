import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

// Card data - emojis make it visually appealing
const cardImages = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    const initialCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, flipped: false }));
    
    setCards(initialCards);
  }, []);

  // Check if all pairs are found
  useEffect(() => {
    if (solved.length === cardImages.length * 2 && cardImages.length > 0) {
      setGameWon(true);
    }
  }, [solved]);

  // Handle card flip
  const handleClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id) || gameWon) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlipped);
    }
  };

  // Check if two flipped cards match
  const checkForMatch = (flippedCards) => {
    const [first, second] = flippedCards;
    
    if (cards[first].image === cards[second].image) {
      setSolved([...solved, first, second]);
      setFlipped([]);
    } else {
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  // Reset game
  const resetGame = () => {
    const newCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image, flipped: false }));
    
    setCards(newCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameWon(false);
  };

  return (
    <div className="memory-game">
      <h1>Memory Card Game</h1>
      <div className="game-info">
        <p>Moves: {moves}</p>
        <button onClick={resetGame}>New Game</button>
      </div>
      
      <div className="cards-grid">
        {cards.map(card => (
          <div 
            key={card.id}
            className={`card ${flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => handleClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.image}</div>
            </div>
          </div>
        ))}
      </div>
      
      {gameWon && (
        <div className="win-message">
          <h2>Congratulations! You won in {moves} moves!</h2>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;