import {useState} from 'react'

const useWordle = (solution)=> {
    const [turn, setTurn] = useState('')
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([])
    const [history, setHistory] = useState([])

    //format a gues into an array of letters
    const formatGuess = () => {

    }

    const addNewGuess = () => {

    }
    
    const handleKeyup = () => {
        return {turn, currentGuess, guesses, isCorrect, handleKeyup}
    }
}