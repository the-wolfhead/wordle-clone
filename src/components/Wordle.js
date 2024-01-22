import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({ solution }) {
  const { currentGuess, handleInputChange, handleKeyup, guesses, isCorrect, usedKeys, turn, resetGame } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isCorrect || turn > 5) {
      setShowModal(true);
    }
  }, [isCorrect, turn]);

  const handleTryAgain = () => {
    resetGame();
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <div>Current Guess - {currentGuess}</div>
        <input
          type="text"
          value={currentGuess}
          maxLength={5}
          onChange={handleInputChange}
          onKeyPress={handleKeyup}
        />
      </div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} onTryAgain={handleTryAgain} />}
    </div>
  );
}
