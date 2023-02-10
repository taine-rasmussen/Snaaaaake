import './Settings.css'

const Settings = (props) => {
  const {
    setNewSpeed,
    newSpeed,
    speed
  } = props;
  
  const increaseSpeed = () => {
    const udpatedSpeed = newSpeed + 25
    if (udpatedSpeed <= 0) return
    return setNewSpeed(udpatedSpeed)
  }

  const decreaseSpeed = () => {
    const udpatedSpeed = newSpeed - 25
    if (udpatedSpeed <= 0) return
    return setNewSpeed(udpatedSpeed)
  }

  return (
    <div className='settings_container'>
        <h1>Setttings</h1>
        <div className='speed_container'>
            <h4>Speed: {newSpeed ? newSpeed : 125}</h4>
            <div className='speed_controls'>
              <button onClick={increaseSpeed}>+</button>
              <button onClick={decreaseSpeed}>-</button>
            </div>
        </div>
        speed
        snake colour
        fruit colour
    </div>
  )
}

export default Settings
