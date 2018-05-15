import React from 'react';

import Cell from './cell'

import './row.css';

const Row = ({ cells, handleActiveCell, handleColumnClick, rowIndex, isPlayerOne, activeCellColumnIndex, activeCellRowIndex }) => {
  return (
    <div className='row'>
      {cells && cells.map((cell, i) => (
          <Cell
            key={i}
            cellValue={cell}
            handleActiveCell={handleActiveCell}
            handleColumnClick={handleColumnClick}
            columnIndex={i}
            rowIndex={rowIndex}
            isPlayerOne={isPlayerOne}
            activeCellColumnIndex={activeCellColumnIndex}
            activeCellRowIndex={activeCellRowIndex} />
        ))}
    </div>
  );
}

export default Row;
