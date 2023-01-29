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
    const context = canvasRef.current.getContext("2d")
    context.fillRect(83, 84, 20, 20)
    console.log(context)
  };

  useEffect(
    () => {
      console.log(canvasRef)
      gameLoop()
    },
    []
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
