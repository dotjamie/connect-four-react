import React, { Component } from 'react';

import Board from './components/board'

import './app.css';

export default class App extends Component {
  state = {
    rows: 6,
    columns: 7,
    gameBoardGrid: [[]],
    isPlayerOne: true,
    activeCellColumnIndex: null,
    activeCellRowIndex: null,
    winner: null
  }

  componentWillMount() {
    this.createGameBoardGrid(this.state.rows, this.state.columns);
  }

  createGameBoardGrid(rows, columns) {
    let gameBoardGrid;
    gameBoardGrid = new Array(rows).fill('');
    gameBoardGrid.map((row, i) => {
      return (
        gameBoardGrid[i] = new Array(columns).fill('')
      );
    });

    this.setState({
      gameBoardGrid
    });
  }

  getRowIndexForNextCellLocation(columnIndex, matrix) {
    for (let rowIndex = matrix.length - 1; rowIndex >= 0 ; rowIndex--) {
      if (matrix[rowIndex][columnIndex] === '') {
        return rowIndex;
      }
    }
  }

  handleActiveCell(columnIndex){
    let gameBoardGrid = [...this.state.gameBoardGrid];
    if (this.state.winner === 'red' || this.state.winner === 'black') return;
    if (this.state.gameBoardGrid[0][columnIndex] !== '') return;

    const rowIndex = this.getRowIndexForNextCellLocation(columnIndex, gameBoardGrid);

    this.setState({
      activeCellColumnIndex: columnIndex,
      activeCellRowIndex: rowIndex
    });
  }

  clearActiveCell() {
    this.setState({
      activeCellColumnIndex: null,
      activeCellRowIndex: null
    });
  }

  handleColumnClick(columnIndex) {
    let gameBoardGrid = [...this.state.gameBoardGrid];
    if (this.state.winner === 'red' || this.state.winner === 'black') return;
    if (this.state.gameBoardGrid[0][columnIndex] !== '') return;

    const rowIndex = this.getRowIndexForNextCellLocation(columnIndex, gameBoardGrid);
    gameBoardGrid[rowIndex][columnIndex] = this.state.isPlayerOne ? 'red' : 'black';

    this.setState({
      gameBoardGrid,
      isPlayerOne: !this.state.isPlayerOne
    });

    this.handleActiveCell(columnIndex);

    // check for game win
    this.allRows(this.state.gameBoardGrid);
    this.allColumnsAtIndex(this.state.gameBoardGrid, columnIndex);
    this.getDiagonalMatrix(this.state.gameBoardGrid);
  }

  // the methods from here to render() are related to checking for game win
  allRows(gameBoardGrid) {
    for (let i = 0; i < gameBoardGrid.length; i++) {
      this.checkForWin(gameBoardGrid[i]);
    }
  }

  allColumnsAtIndex(matrix, index) {
    let columns = [];
    for (let row = 0; row < matrix.length; row++) {
      columns.push(matrix[row][index]);
    }
    this.checkForWin(columns);
  }

  arrFromTopLeftToBottomRight(matrix, i, j) {
    let newArr = [];
    let col = j;

    for (let row = i; row >= 0; row--) {
      if (matrix[row][col] === undefined) break;
      newArr.push(matrix[row][col]);
      col++;
    }
    return newArr;
  }

  arrFromTopRightToBottomLeft(matrix, i, j) {
    let newArr = [];
    let col = j;

    for (let row = i; row >= 0; row-- ) {
      if (matrix[row][col] === undefined) break;
      newArr.push(matrix[row][col]);
      col--;
    }
    return newArr;
  }

  getDiagonalMatrix(matrix){
    let diagonalMatrix = [];
    const lastRowIndex = matrix.length - 1;

    // add diagonal cells from top left to bottom right to matrix
    for (let row = 0; row < matrix.length; row++) {
      diagonalMatrix.push(this.arrFromTopLeftToBottomRight(matrix, row, 0));
    }
    for (let i = 1; i < matrix[lastRowIndex].length; i++) {
      diagonalMatrix.push(this.arrFromTopLeftToBottomRight(matrix, lastRowIndex, i));
    }

    // add diagonal cells from top right to bottom left to matrix
    for (let row = 0; row <= lastRowIndex; row++) {
       diagonalMatrix.push(this.arrFromTopRightToBottomLeft(matrix, row, matrix[lastRowIndex].length - 1));
    }
    for (let i = matrix[lastRowIndex].length; i >= 0; i--) {
      diagonalMatrix.push(this.arrFromTopRightToBottomLeft(matrix, lastRowIndex, i));
    }

    // check all diagonals options for win
    this.allRows(diagonalMatrix);
  }

  checkForWin(sequence) {
    if (sequence.length < 4) return
    let count = {
      red: 0,
      black: 0
    };

    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] !== 'red') count['red'] = 0;
      if (sequence[i] === 'red') count['red']++;
      if (sequence[i] !== 'black') count['black'] = 0;
      if (sequence[i] === 'black') count['black']++;
      if (count['red'] >= 4) {
        this.setState({
          winner: 'red',
        });
        this.clearActiveCell();
      }
      if (count['black'] >= 4) {
        this.setState({
          winner: 'black',
        });
        this.clearActiveCell();
      }
    }
  }

  render() {
    let gameStatus =  this.state.isPlayerOne ? 'Player One\'s turn' : 'Player Two\'s turn';

    if (this.state.winner === 'red') gameStatus = 'Player One is the winner!';
    if (this.state.winner === 'black') gameStatus = 'Player Two is the winner!';

    return (
      <div className="app">
        <h1 className="app-title">Welcome to Connect Four</h1>
        <div>{gameStatus}</div>

        <Board
          gameBoardGrid={this.state.gameBoardGrid}
          isPlayerOne={this.state.isPlayerOne}
          handleColumnClick={(rowIndex, columnIndex) => this.handleColumnClick(rowIndex, columnIndex)}
          handleActiveCell={(columnIndex) => this.handleActiveCell(columnIndex)}
          activeCellColumnIndex={this.state.activeCellColumnIndex}
          activeCellRowIndex={this.state.activeCellRowIndex}
          clearActiveCell={() => this.clearActiveCell()} />
      </div>
    );
  }
}
