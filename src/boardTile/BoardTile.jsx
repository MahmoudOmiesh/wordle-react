import React from 'react';
import './BoardTile.css';

export default function BoardTile({
  guessWord,
  actualWord,
  rowIdx,
  isInCurrentRow,
}) {
  const guessLetter = guessWord ? guessWord[rowIdx] : '';
  const actualLetter = actualWord[rowIdx];

  function getClassName() {
    if (!guessLetter) return 'board__tile';
    if (isInCurrentRow || !actualWord.includes(guessLetter)) {
      return 'board__tile absent';
    }
    if (guessLetter === actualLetter) {
      return 'board__tile correct';
    }
    if (
      actualWord.includes(guessLetter) &&
      guessWord.every((letter, idx) => letter !== actualWord[idx])
    ) {
      return 'board__tile present';
    }
    return 'board__tile absent';
  }

  return <div className={getClassName()}>{guessLetter}</div>;
}
