import { useCallback, useEffect } from 'react';
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








  const gameLoop = () => {

  };

  useEffect(
    () => {

    },
    []
  )

  return (
    <div className="app_container">
      <canvas
        style={{ border: "1px solid black" }}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      <button>
        Start game
      </button>
    </div>
  );
}

export default App;
