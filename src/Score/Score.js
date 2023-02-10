
const Score = (props) => {
  const {
    score: {
      curr,
      prev,
      high
    }
  } = props

  return (
    <div className='score_container'>
      <div>
        <h3>High score: {high}</h3>
      </div>
      <div>
        <h3>Current score: {curr}</h3>
      </div>
      <div>
        <h3>Previous score: {prev}</h3>
      </div>
    </div>
  )
}

export default Score
