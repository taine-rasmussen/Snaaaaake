import './Settings.css'

const Settings = (props) => {
  const {
    newSpeed,
    setNewSpeed,
    setSnakeColour,
    setFruitColour
  } = props;

  const allSnakeColours = ['#ff6400', '#4b6496', '#4bc696', '#e0d910', '#e237d6']
  const allFruitColours = ['#000', '#ca37d6', '#113700', '#7c3700', '#7c37c2']
  
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
        <div 
          className='colours_container' 
          style={{borderBottom: '2px solid #000', padding: '20px 0px' }}>
          <h4>Change Snake Colour</h4>
        <div className='colour_container'>
          {allSnakeColours.map(colour => {
            return (
              <div
                key={colour}
                className='colour_option'
                style={{ backgroundColor: colour }}
                onClick={() => { setSnakeColour(colour) }}
              />
            )
          })}
        </div>
        </div>
        <div className='colours_container'>
          <h4>Change Fruit Colour</h4>
          <div className='colour_container'>
            {allFruitColours.map(colour => {
              return(
                <div 
                  key={colour}
                  className='colour_option'
                  style={{backgroundColor: colour}}
                  onClick={() => {setFruitColour(colour)}}
                />
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default Settings
