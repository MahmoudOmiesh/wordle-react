import React from 'react';
import BoardTile from '../boardTile/BoardTile';
import './BoardRow.css';
import { ROW_SIZE } from '../app/App';

export default function BoardRow({
  currentWord,
  guess,
  isCurrentRow,
  setKeyBoardColors,
}) {
  return (
    <div className='board__row'>
      {[...Array(ROW_SIZE).keys()].map(idx => {
        return (
          <BoardTile
            key={idx}
            guessWord={guess}
            actualWord={currentWord}
            rowIdx={idx}
            isInCurrentRow={isCurrentRow}
          />
        );
      })}
    </div>
  );
}
