import './App.css';
import { 
  CANVAS_SIZE,
  SPEED,
  SNAKE_START,
  FRUIT_START 
} from './Constants'

function App() {
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
