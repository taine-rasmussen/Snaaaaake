import { useEffect, useRef, useState } from 'react';
import { useInterval } from "./useInterval";
import { 
  CANVAS_SIZE,
  SNAKE_START,
  FRUIT_START,
  DIRECTIONS,
  SCALE
} from './Constants'
import './App.css';

import Score from './Score/Score'
import Settings from './Settings/Settings'
import Gameboard from './Gameboard/Gameboard'

function App() {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [fruit, setFruit] = useState(FRUIT_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [newSpeed, setNewSpeed] = useState(125)
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState({curr: 0, prev: 0, high: 0})
  const [snakeColour, setSnakeColour] = useState('#ff6400')
  const [fruitColour, setFruitColour] = useState('#ff6496')

  const startGame = () => {
    setSnake(SNAKE_START);
    setFruit(FRUIT_START);
    setDir([0, -1]);
    setSpeed(newSpeed);
    setGameOver(false);
  };

  const oppositeDirections = {
    38: [0, 1],
    40: [0, -1],
    37: [1, 0],
    39: [-1, 0]
  }

  const moveSnake = ({ keyCode }) => {
    if (oppositeDirections[keyCode][0] == dir[0] && oppositeDirections[keyCode][1] == dir[1]) return
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  }

  const randomNum = () => {
    return Math.floor(Math.random() * (19 - 0 + 1) + 0)
  }

  const createNewFruit = () => {
    const newFruitLocation = [randomNum(),randomNum()]
    snake.map(cell => {
      if (cell[0] == newFruitLocation[0] && cell[1] == newFruitLocation[1]){
        return createNewFruit()
      }
    })
    return setFruit(newFruitLocation)
  }

  const checkFruitCollision = () => {
    if (snake[0][0] == fruit[0] && snake[0][1] == fruit[1]){
      const snakeCopy = JSON.parse(JSON.stringify(snake));
      const newSnakeTail = [snakeCopy[snake.length - 1][0], snakeCopy[snake.length - 1][1] + 1]
      snakeCopy.push(newSnakeTail)
      createNewFruit()
      setSnake(snakeCopy)
      score.curr = score.curr + 10
    }
  };

  const endGame = () => {
    if(score.curr > score.high) score.high = score.curr
    score.prev = score.curr
    score.curr = 0
    setSpeed(null)
    setGameOver(true)
  }

  const checkOutOfBounds = (head) => {
    if(
      head[0] * SCALE >= CANVAS_SIZE[0] ||
      head[0] < 0 ||
      head[1] * SCALE >= CANVAS_SIZE[1] ||
      head[1] < 0
    ) {
      return true
    } else return false
  }

  const checkSnakeCollision = (head, snk = snake) => {
    for (const segment of snk) {
      if (head[0] === segment[0] && head[1] === segment[1]) return true;
    }
    return false;
  }

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    snakeCopy.pop();
    if (checkSnakeCollision(newSnakeHead)) endGame()
    if (checkOutOfBounds(newSnakeHead)) endGame()
    setSnake(snakeCopy);
  };

  useInterval(() => gameLoop(), speed);

  useEffect(
    () => {
      const context = canvasRef.current.getContext("2d")
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      checkFruitCollision()
      context.fillStyle = snakeColour;
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
      context.fillStyle = fruitColour;
      context.fillRect(fruit[0], fruit[1], 1, 1);
    },
    [snake, fruit, gameOver, snakeColour, fruitColour]
  );

  return (
    <div 
      className="app_container"
      role="button"
      tabIndex="0"
      onKeyDown={e => moveSnake(e)}
    >
      <Settings
        newSpeed={newSpeed}
        setNewSpeed={setNewSpeed}
        setSnakeColour={setSnakeColour}
        setFruitColour={setFruitColour}
      />
      <Gameboard 
        startGame={startGame}
        gameOver={gameOver}
        canvasSize={CANVAS_SIZE}
        canvasRef={canvasRef}
      />
      <Score
        score={score}
      />
    </div>
  );
}

export default App;
