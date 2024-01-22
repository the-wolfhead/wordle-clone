import { useState } from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((letter, index) => {
      const correctPosition = solutionArray[index] === letter;
      const correctLetter = solutionArray.includes(letter);

      // Mark the letter as used
      solutionArray[index] = null;

      if (correctPosition) {
        return { key: letter, color: 'green' };
      } else if (correctLetter) {
        return { key: letter, color: 'red' };
      } else {
        return { key: letter, color: 'yellow' };
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUsedKeys) => {
      const newKeys = { ...prevUsedKeys };

      formattedGuess.forEach(({ key, color }) => {
        if (color === 'green' && !newKeys[key]) {
          newKeys[key] = 'green';
        } else if (color === 'yellow' && (!newKeys[key] || newKeys[key] === 'red')) {
          newKeys[key] = 'yellow';
        } else if (color === 'red' && !newKeys[key]) {
          newKeys[key] = 'red';
        }
      });

      return newKeys;
    });

    setCurrentGuess('');
  };

  const resetGame = () => {
    setTurn(0);
    setCurrentGuess('');
    setGuesses([...Array(6)]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
  };

  const handleInputChange = (event) => {
    setCurrentGuess(event.target.value.toUpperCase());
  };

  const handleEnterPress = () => {
    if (turn > 5) {
      console.log('you used all your guesses!');
      return;
    }

    if (history.includes(currentGuess)) {
      console.log('you already tried that word.');
      return;
    }

    if (currentGuess.length !== 5) {
      console.log('word must be 5 chars.');
      return;
    }

    const formatted = formatGuess();
    addNewGuess(formatted);
  };

  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      handleEnterPress();
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    }
  };

  return { turn, currentGuess, guesses, usedKeys, isCorrect, handleInputChange, handleEnterPress, resetGame, handleKeyup };
};

export default useWordle;



