const CANVAS_SIZE = [800, 800];
const SNAKE_START = [[8, 17], [8, 18]]
const FRUIT_START = [8, 3]
const SCALE = 40;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  FRUIT_START,
  DIRECTIONS,
  SCALE
};