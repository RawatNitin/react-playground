import { useMemo, useState } from "react";
import "./tic-tac-toe.css";

const winningIndexes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const TicTacToe = () => {
  const [history, setHistory] = useState([new Array(9).fill(null)]);
  const [step, setStep] = useState(0);

  const cells = useMemo(() => {
    return history[step];
  }, [step, history]);

  const whoIsWinner = useMemo(() => {
    let winner;
    for (let i = 0; i < winningIndexes.length; i++) {
      const [a, b, c] = winningIndexes[i];

      const value1 = cells[a];
      const value2 = cells[b];
      const value3 = cells[c];

      if (!value1 || !value2 || !value3) {
        continue;
      }

      if (value1 === value2 && value1 === value3) {
        winner = value1;
        break;
      }
    }
    return winner;
  }, [cells]);

  const isMatchDraw = useMemo(() => {
    if (whoIsWinner) return;

    return cells.every((cell) => cell);
  }, [cells, whoIsWinner]);

  const onPlay = (cellIndex) => {
    if (cells[cellIndex] || whoIsWinner || isMatchDraw) return;

    const newCells = [...cells];
    newCells[cellIndex] = step < 1 || step % 2 === 0 ? "O" : "X";

    setHistory((history) => [...history, newCells]);
    setStep((step) => step + 1);
  };

  const onReset = () => {
    setHistory([new Array(9).fill(null)]);
    setStep(0);
  };

  const onUndo = () => {
    setStep((step) => step - 1);
    setHistory((history) => history.slice(0, -1));
  };

  return (
    <div className="game-container">
      <ul>
        {history.map((item, index) => {
          return (
            <li>
              {index} {JSON.stringify(item)}
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onReset}>Reset Game</button>
        {
          <button disabled={step === 0} onClick={onUndo}>
            Undo
          </button>
        }
      </div>
      Winner is: {whoIsWinner}
      {isMatchDraw ? <h6>Match Draw</h6> : null}
      <div
        style={whoIsWinner ? { pointerEvents: "none" } : {}}
        className="game"
      >
        {cells.map((cell, index) => {
          return (
            <span
              style={cell ? { pointerEvents: "none" } : {}}
              key={index}
              onClick={() => onPlay(index)}
              className="cell"
            >
              {cell}
            </span>
          );
        })}
      </div>
    </div>
  );
};
