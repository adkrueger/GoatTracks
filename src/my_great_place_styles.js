const K_WIDTH = 80;
const K_HEIGHT = 80;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '4px solid white',
  borderRadius: K_HEIGHT,
  backgroundColor: 'red',
  opacity: 0.4,
  textAlign: 'center',
  color: 'white',
  fontSize: 25,
  fontWeight: 'bold',
  padding: 8,
  paddingTop: 23,
};

export {greatPlaceStyle};