import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./Winning_combinations";
import GameOver from "./components/GameOver";

function driveActivePlayer(gameTurns) {
  let curPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === "X")
    curPlayer = "O";

  return curPlayer;
}// gameTurns를 받아와 가장 앞의 플레이어가 x면 o를 아니면 x를 반환

function driveWinner(gameBoard, players){
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }

  }
  return winner;
}

function driveGameBoard(gameTurns){
  let gameBoard = [...initailGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square;

    gameBoard[row][col] = player;
  } // turns가 빈 배열이면 for문 동작 안함

  return gameBoard

}

const initailGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  const [gameTurns, setGameTurns] = useState([]); // 
  const activePlayer = driveActivePlayer(gameTurns);
  const [players, setPlayers] = useState({
    'X': "Player 1",
    'O': "Player 2"
  });


  const gameBoard = driveGameBoard(gameTurns);
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns(prevTurn => {
      const activePlayer = driveActivePlayer(prevTurn); // 이전 상태를 확인후 현재 플레이어 변경
      const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer },
      ...prevTurn
      ]; // rowIndex, colIndex를 받아와 gameTurns를 저장
      return updatedTurn;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
     return{ ...prevPlayers,
      [symbol] : newName
    }

    })

  }

  const winner = driveWinner(gameBoard, players);

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name={"Player1"} symbol={"X"} isActive={activePlayer === 'X'} onChangePlayerName={handlePlayerNameChange}/>
        <Player name={"Player2"} symbol={"O"} isActive={activePlayer === 'O'} onChangePlayerName={handlePlayerNameChange}/>
      </ol>

      {(winner || hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  <button onClick={() => {console.log(gameTurns.length)}}>asdf</button>
  </main>
}

export default App
