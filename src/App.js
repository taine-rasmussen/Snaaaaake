import { useCallback, useEffect, useRef, useState } from 'react';
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

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    console.log('before:', newSnakeHead, snake);
    snakeCopy.unshift();
    console.log('after:', newSnakeHead, snake);
    snakeCopy.pop();
    setSnake(snakeCopy);
    // Create copy of snake.
    // Update snakeHead by adding current directions to it
    // Add newHead to snake
    // update state with new snake
  };

  useEffect(
    () => {
      gameLoop()
      console.log(canvasRef)
      const context = canvasRef.current.getContext("2d")
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      //Clears whole canvas
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      // Sets given cell colour to pink for n length of snake
      context.fillStyle = "pink";
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
      // Sets cell to fruit
      context.fillStyle = "lightblue";
      context.fillRect(fruit[0], fruit[1], 1, 1);
    },
    [snake, fruit, gameOver]
  )

  return (
    <div 
      className="app_container"
      role="button"
      tabIndex="0"
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
