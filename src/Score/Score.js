import './Score.css'

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
      <ul>
        <li>
          High score: {high}
        </li>
        <li>
          Current score: {curr}
        </li>
        <li>
          Previous score: {prev}
        </li>
      </ul>
    </div>
  )
}

export default Score
