import React from 'react';
import BoardRow from '../boardRow/BoardRow';
import './Board.css';
import { BOARD_SIZE } from '../app/App';

export default function Board({
  currentWord,
  guess,
  guessHistory,
  currentRowIdx,
  setKeyBoardColors,
}) {
  return (
    <div className='board'>
      {[...Array(BOARD_SIZE).keys()].map(idx => {
        return (
          <BoardRow
            currentWord={currentWord}
            key={idx}
            guess={idx === currentRowIdx ? guess : guessHistory[idx]}
            isCurrentRow={idx === currentRowIdx}
          />
        );
      })}
    </div>
  );
}
