import { useState } from 'react'
import './App.css'

interface CellProps {
  rowIndex: number;
  colIndex: number;
  value: number;
  handleGridChange: (rowIndex: number, colIndex: number, value: number) => void;
}

function Cell({ rowIndex, colIndex, value, handleGridChange }: CellProps) {
  return (
    <input value={value} className='cellInput' maxLength={1} onChange={(e) => handleGridChange(rowIndex, colIndex, parseInt(e.target.value) || 0)} />
  );
}

interface GridProps {
  grid: number[][];
  handleGridChange: (rowIndex: number, colIndex: number, value: number) => void;
}

function Grid({ grid, handleGridChange }: GridProps) {
  return (
    <div className='grid'>
      {grid.map((row: number[], rowIndex: number) =>
        <div key={rowIndex} className={(rowIndex + 1) % 3 == 0 ? 'bRowBorder' : 'nRowBorder'}>
          {row.map((value: number, colIndex: number) =>
            <div key={colIndex} className={(colIndex + 1) % 3 == 0 ? 'rBorder' : 'nBorder'}>
              <Cell rowIndex={rowIndex} colIndex={colIndex} value={value} handleGridChange={handleGridChange} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface HistCellProps {
  value: number;
}

function HistCell({ value }: HistCellProps) {
  return (
    <input value={value} className='histCellInput' readOnly />
  );
}

interface HistGridProps {
  grid: number[][];
}

function HistGrid({ grid }: HistGridProps) {
  return (
    <div className='histGrid'>
      {grid.map((row: number[], rowIndex: number) =>
        row.map((value: number, colIndex: number) =>
          <div key={(rowIndex + 1) * (colIndex + 1)} className={(rowIndex + 1) % 3 == 0 ? ((colIndex + 1) % 3 == 0 ? 'brHistBorder' : 'bHistBorder') : ((colIndex + 1) % 3 == 0 ? 'rHistBorder' : 'histBorder')}>
            <HistCell value={value} />
          </div>
        )
      )}
    </div>
  );
}

function App() {
  const [grid, setGrid] = useState<number[][]>([
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
  ]);

  const [histGrids, setHistGrids] = useState<number[][][]>(new Array<number[][]>(2).fill(new Array<number[]>(9).fill(new Array<number>(9).fill(0))));

  function handleGridChange(rowIndex: number, colIndex: number, value: number) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[rowIndex][colIndex] = value;
    setGrid(newGrid);
  }

  async function handleSolvePuzzle() {
    handleGetLast2();
    const response = await fetch('http://127.0.0.1:8000/api/solve_puzzle/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "puzzle": grid,
      }),
    });
    const json = await response.json();
    const solution = json.solution;
    setGrid(solution);
  }

  async function handleGetLast2() {
    const response = await fetch('http://127.0.0.1:8000/api/get_last_2/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json = await response.json();
    const history = [json[0].solution, json[1].solution];
    setHistGrids(history);
  }

  function handleClearPuzzle() {
    const newGrid = new Array(9).fill(new Array(9).fill(0));
    setGrid(newGrid);
  }

  return (
    <>
      <div className='headerContainer'>
        <h1 className='headerText'>Sudoku Solver</h1>
      </div>
      <div className='puzzleContainer'>
        <Grid grid={grid} handleGridChange={handleGridChange} />
      </div>
      <div className='historyContainer'>
        <HistGrid grid={histGrids[0]} />
        <HistGrid grid={histGrids[1]} />
      </div>
      <div className='buttonsContainer'>
        <button onClick={() => handleSolvePuzzle()}>Solve</button>
        <button onClick={() => handleClearPuzzle()}>Clear</button>
      </div>
    </>
  );
}

export default App
