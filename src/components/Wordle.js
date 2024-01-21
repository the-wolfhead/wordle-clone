import { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({ solution }) {
  const { currentGuess, handleInputChange, handleEnterPress, guesses, isCorrect, usedKeys, turn } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
    }
  }, [isCorrect, turn]);

  return (
    <div>
      <div>
        <div>Current Guess - {currentGuess}</div>
        <input
          type="text"
          value={currentGuess}
          maxLength={5}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleEnterPress();
            }
          }}
        />
      </div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  );
}
