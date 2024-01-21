import { useState } from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: 'red' };
    });

    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === 'green') {
          newKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          newKeys[l.key] = 'yellow';
          return;
        }
        if (l.color === 'red' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[l.key] = 'red';
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess('');
  };

  const handleInputChange = (event) => {
    setCurrentGuess(event.target.value.toUpperCase()); // Convert to uppercase for consistency
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

  return { turn, currentGuess, guesses, usedKeys, isCorrect, handleInputChange, handleEnterPress };
};

export default useWordle;
