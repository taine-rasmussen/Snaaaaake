import '../App.css'

const Gameboard = (props) => {
  const {
    canvasRef,
    startGame,
    gameOver,
    canvasSize
  } = props;
  
  return (
    <div className='game_container'>
      <canvas
        className='gameboard'
        width={`${canvasSize[0]}px`}
        height={`${canvasSize[1]}px`}
        ref={canvasRef}
      />
      <button
        onClick={startGame}
      >
        {gameOver ? 'Try Again...' : 'Start game'}
      </button>
    </div>
  )
}

export default Gameboard
