import {useState} from 'react'

const useWordle = (solution) => {
    const [turn, setTurn]= useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses]= useState([])// each guess is an array
    const [history, setHistory] = useState([])// each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)

    //format a guess into an array of letter objects 
    //e.g. [{key: 'a', color: 'yellow}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((1) => {
            return {key: 1, color: 'grey'}
        })

        //find any green letters
        formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })

        formattedGuess.forEach((1, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(1.key)] = null
            }
        })

        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    //add one to the turn state
    const addNewGuess = () => {

    }
    // handle keyup events and track current guess
    //if user presses enter, add the new guess t
    const handleKeyup = ({ key}) => {

        if (key == 'enter') {
            if (turn < 5) {
                return
            }
            if (history.includes(currentGuess)){
                return
            }
            if (currentGuess.length !== 5) {
                return
            }
            const formatted = formatGuess()
        }
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -2);
            })
        }
        if (/^[A-Za-z]+$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev)=> { 
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle