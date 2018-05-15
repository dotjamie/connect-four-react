import React from 'react';
import Row from './row'

import './board.css';

const Board = ({ gameBoardGrid, handleColumnClick, handleActiveCell, isPlayerOne, activeCellRowIndex, activeCellColumnIndex, clearActiveCell }) => (
  <div className='board' onMouseOut={clearActiveCell}>
    {gameBoardGrid && gameBoardGrid.map((row, i) => (
        <Row
          key={i}
          cells={row}
          handleActiveCell={handleActiveCell}
          handleColumnClick={handleColumnClick}
          rowIndex={i}
          isPlayerOne={isPlayerOne}
          activeCellColumnIndex={activeCellColumnIndex}
          activeCellRowIndex={activeCellRowIndex} />
      ))}
  </div>
);

export default Board
