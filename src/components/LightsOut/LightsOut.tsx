import React, { useState } from 'react';
import reportWebVitals from '../../reportWebVitals';
import './LightsOut.scss';

const LightsOut: React.FC = () => {

  const getInitialGrid = () => {
    let grid = [];
    grid[0] = [false,false,true,true,true];
    grid[1] = [false,true,true,true,true];
    grid[2] = [true,true,true,true,true];
    grid[3] = [true,true,true,true,true];
    grid[4] = [true,true,true,true,true];

    return grid;
  };

  const [count, setCount] = useState(0);
  const [rows, setRows] = useState(getInitialGrid);

  const incrementClick = () => {
    setCount(count + 1)
  }

  const swapStatus = (rowId: number, colId: number) => {
    let updatedRows = rows;
    updatedRows[rowId][colId] = !updatedRows[rowId][colId];
    setRows(updatedRows);
  }

  const updateMatrix = (status: Boolean, rowId: number, colId: number) => {
    incrementClick();

    // update upper row
    if (rowId - 1 >= 0) {
      swapStatus(rowId - 1, colId);
    }

    // update current row
    if (colId - 1 >= 0 ) {
      swapStatus(rowId, colId - 1);
    }
    swapStatus(rowId, colId);
    if (colId + 1 >= 0 ) {
      swapStatus(rowId, colId + 1);
    }

    // update bottom row
    if (rowId + 1 < 5) {
      swapStatus(rowId + 1, colId);
    }

    checkIfSolved();
  }

  const getCols = (rowId: number, numCols: number) => {
    let columnData: any = [];
    let toggleClass;
    for (let col = 0; col < numCols; col++) {
      toggleClass = rows[rowId][col] === false ? "off" : "on";
      if (col % 2 === 0) {
        columnData.push(<div onClick={() => updateMatrix(rows[rowId][col], rowId, col)} className={`col shadow ${toggleClass}`}></div>);
      } else {
        columnData.push(<div onClick={() => updateMatrix(rows[rowId][col], rowId, col)} className={`col shadow ${toggleClass}`}></div>);
      }
    }

    return columnData;
  }

  const checkIfSolved = () => {

  }

  const getRows = () => {
    const gridLength = rows.length;
    let numCols = gridLength;

    let rowData = [];

    for (let row = 0; row < 5; row++) {
      rowData.push(
        <div className="row">{getCols(row, numCols)}</div>
      );
    }

    return <React.Fragment>{rowData}</React.Fragment>;
  }

  return (
    <div>
      <h2>{count} clicks</h2>
      <div className="LightsOut" data-testid="LightsOut">
        {getRows()}
      </div>
    </div>
  )
};

export default LightsOut;
