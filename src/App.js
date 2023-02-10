import { useEffect, useRef, useState } from 'react';
import { useInterval } from "./useInterval";
import { 
  CANVAS_SIZE,
  SNAKE_START,
  FRUIT_START,
  DIRECTIONS,
  SCALE,
  SPEED
} from './Constants'
import './App.css';

function App() {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [fruit, setFruit] = useState(FRUIT_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setSnake(SNAKE_START);
    setFruit(FRUIT_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  const moveSnake = ({ keyCode }) => {
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  }

  const randomNum = () => {
    return Math.floor(Math.random() * (19 - 0 + 1) + 0)
  }

  const createNewFruit = () => {
    const newFruitLocation = [randomNum(),randomNum()]
    snake.map(cell => {
      if (cell.toString() == newFruitLocation.toString()){
        return createNewFruit()
      }
    })
    return setFruit(newFruitLocation)
  }

  const checkFruitCollision = () => {
    const fruitPos = fruit.toString()
    const snakePos = snake[0].toString()
    if(snakePos == fruitPos){
      const snakeCopy = JSON.parse(JSON.stringify(snake));
      const newSnakeTail = [snakeCopy[snake.length - 1][0], snakeCopy[snake.length - 1][1] + 1]
      snakeCopy.push(newSnakeTail)
      setSnake(snakeCopy)
      createNewFruit()
    }
  };

  const endGame = () => {
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

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    snakeCopy.pop();
    checkFruitCollision()
    if (checkOutOfBounds(newSnakeHead)) endGame()
    setSnake(snakeCopy);
  };

  
  
  useInterval(() => gameLoop(), speed);

  useEffect(
    () => {
      const context = canvasRef.current.getContext("2d")
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "pink";
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
      context.fillStyle = "lightblue";
      context.fillRect(fruit[0], fruit[1], 1, 1);
      console.log(snake[0])
    },
    [snake, fruit, gameOver]
  );

  return (
    <div 
      className="app_container"
      role="button"
      tabIndex="0"
      onKeyDown={e => moveSnake(e)}
    >
      <canvas
        style={{ border: "1px solid black" }}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
        ref={canvasRef}
      />
      <button
        onClick={startGame}
      >
        Start game
      </button>
      {gameOver && <div>Game Over</div>}
    </div>
  );
}

export default App;
