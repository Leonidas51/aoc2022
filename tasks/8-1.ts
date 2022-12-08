import fs from 'fs';

const eightOne = async () => {
  const data = fs.readFileSync('./data/8.txt', 'utf8')
    .split('\n')
    .map(line => line.split('').map(Number));

  let visibleCount = 0;

  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (isVisible(data, x, y)) {
        visibleCount++;
      }
    }
  }

  console.log(visibleCount);
}

const isVisible = (data: number[][], x: number, y: number) => {
  const visibility = {
    top: true,
    bottom: true,
    left: true,
    right: true,
  };

  let val = data[x][y];

  for (let currentX = x - 1; currentX >= 0; currentX--) {
    if (data[currentX][y] >= val) {
      visibility.left = false;
      break;
    }
  }

  for (let currentX = x + 1; currentX < data[x].length; currentX++) {
    if (data[currentX][y] >= val) {
      visibility.right = false;
      break;
    }
  }

  for (let currentY = y - 1; currentY >= 0; currentY--) {
    if (data[x][currentY] >= val) {
      visibility.top = false;
      break;
    }
  }

  for (let currentY = y + 1; currentY < data[y].length; currentY++) {
    if (data[x][currentY] >= val) {
      visibility.bottom = false;
      break;
    }
  }

  return Object.values(visibility).some(val => val);
}

eightOne();