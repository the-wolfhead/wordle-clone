import React from 'react';

const Modal = ({ isCorrect, turn, solution, onTryAgain }) => {
  return (
    <div className="modal">
      {isCorrect ? (
        <div>
          <h1>You Win</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
        </div>
      ) : (
        <div>
          <h1>Nevermind!</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time :)</p>
          <button onClick={onTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Modal;

