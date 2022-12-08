import fs from 'fs';

const eightTwo = async () => {
  const data = fs.readFileSync('./data/8.txt', 'utf8')
    .split('\n')
    .map(line => line.split('').map(Number));

  let maxScenicScore = 0;

  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      maxScenicScore = Math.max(maxScenicScore, calcScenicScore(data, x, y));
    }
  }

  console.log(maxScenicScore);
}

const calcScenicScore = (data: number[][], x: number, y: number) => {
  const scores = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  let val = data[x][y];

  for (let currentX = x - 1; currentX >= 0; currentX--) {
    scores.left++;

    if (data[currentX][y] >= val) {
      break;
    }
  }

  for (let currentX = x + 1; currentX < data[x].length; currentX++) {
    scores.right++;

    if (data[currentX][y] >= val) {
      break;
    }
  }

  for (let currentY = y - 1; currentY >= 0; currentY--) {
    scores.top++;

    if (data[x][currentY] >= val) {
      break;
    }
  }

  for (let currentY = y + 1; currentY < data[y].length; currentY++) {
    scores.bottom++;

    if (data[x][currentY] >= val) {
      break;
    }
  }

  return scores.left * scores.right * scores.top * scores.bottom;
}

eightTwo();