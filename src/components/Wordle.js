import {useEffect} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

export default function Wordle({solution}) {
    const {currentGuess, handleKeyup, guesses, isCorrect, usedKeys, turn } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
          window.removeEventListener('keyup', handleKeyup)
        }

        if(turn > 5) {
          window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

    

  return (
    <div>
        <div>solution -{solution}</div>
        <div>current Guess - {currentGuess}</div>
        <Grid currentGuess = {currentGuess} guesses = {guesses} turn = {turn}/>
        <Keypad usedKeys={usedKeys} />
    </div>
  )
}
