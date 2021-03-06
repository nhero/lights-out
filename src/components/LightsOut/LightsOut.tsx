import React, { useState } from "react";
import "./LightsOut.scss";

const LightsOut: React.FC = () => {
  const getInitialGrid = () => {
    let grid = [];
    grid[0] = [true, false, false, false, true];
    grid[1] = [false, true, false, true, false];
    grid[2] = [false, false, true, false, false];
    grid[3] = [false, true, false, true, false];
    grid[4] = [true, false, false, false, true];

    return grid;
  };

  const [count, setCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [rows, setRows] = useState(getInitialGrid);

  const incrementClick = () => {
    setCount(count + 1);
  };

  const swapStatus = (rowId: number, colId: number) => {
    let updatedRows = rows;
    updatedRows[rowId][colId] = !updatedRows[rowId][colId];
    setRows(updatedRows);
  };

  const updateMatrix = (status: Boolean, rowId: number, colId: number) => {
    incrementClick();

    // update upper row
    if (rowId - 1 >= 0) {
      swapStatus(rowId - 1, colId);
    }

    // update current row
    if (colId - 1 >= 0) {
      swapStatus(rowId, colId - 1);
    }
    swapStatus(rowId, colId);
    if (colId + 1 < 5) {
      swapStatus(rowId, colId + 1);
    }

    // update bottom row
    if (rowId + 1 < 5) {
      swapStatus(rowId + 1, colId);
    }

    checkIfSolved();
  };

  const getCols = (rowId: number, numCols: number) => {
    let columnData: any = [];
    let toggleClass;
    for (let col = 0; col < numCols; col++) {
      toggleClass = rows[rowId][col] === false ? "off" : "on";
      columnData.push(
        <div
          key={`${rowId}-${col}`}
          onClick={() => updateMatrix(rows[rowId][col], rowId, col)}
          className={`col shadow ${toggleClass}`}
        ></div>
      );
    }

    return columnData;
  };

  const checkIfSolved = () => {
    if (
      !rows[0].includes(true) &&
      !rows[1].includes(true) &&
      !rows[2].includes(true) &&
      !rows[3].includes(true) &&
      !rows[4].includes(true)
    ) {
      setSolved(true);
    }
  };

  const reset = () => {
    setSolved(false);
    setCount(0);
    setRows(getInitialGrid());
  };

  const getRows = () => {
    const gridLength = rows.length;
    let numCols = gridLength;

    let rowData = [];

    for (let row = 0; row < 5; row++) {
      rowData.push(
        <div className="row" key={row}>
          {getCols(row, numCols)}
        </div>
      );
    }

    return <React.Fragment>{rowData}</React.Fragment>;
  };

  return (
    <div>
      <h2>
        {solved ? `You solved the puzzle in ${count} trys!` : `${count} clicks`}
      </h2>
      <button onClick={reset}>Start Over</button>
      <div className="LightsOut" data-testid="LightsOut">
        {getRows()}
      </div>
    </div>
  );
};

export default LightsOut;
