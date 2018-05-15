import React from 'react';

import './cell.css';

const Cell = ({ cellValue, isPlayerOne, rowIndex, columnIndex, activeCellRowIndex, activeCellColumnIndex, handleActiveCell, handleColumnClick }) => {
  let cellClass = 'cell ';
  if (cellValue !== '') cellClass += cellValue;
  if (rowIndex === activeCellRowIndex && columnIndex === activeCellColumnIndex && cellValue === '' ) {
    cellClass += isPlayerOne ? 'red_hover' : 'black_hover';
  }

  return (
    <div className={cellClass}
      onMouseOver={() => handleActiveCell(columnIndex)}
      onClick={() => handleColumnClick(columnIndex)}>
    </div>
  );
}

export default Cell;
