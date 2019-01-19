const K_WIDTH = 60;
const K_HEIGHT = 60;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  borderRadius: K_HEIGHT,
  backgroundColor: 'transparent',
  opacity: 0.85,
  textAlign: 'center',
  color: 'white',
  fontSize: 25,
  fontWeight: 'bold',
  padding: 8,
  paddingTop: 13,
};

export {greatPlaceStyle};