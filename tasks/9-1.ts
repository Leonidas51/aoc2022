import fs from 'fs';

const directions: Record<string, [number, number]> = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

const nineOne = async () => {
  const data = fs.readFileSync('./data/9.txt', 'utf8').split('\n');

  const head = {
    x: 0,
    y: 0,
  };

  const tail = {
    x: 0,
    y: 0,
  };

  const pointsSet = new Set<string>();

  for (const line of data) {
    const [direction, stepsCount] = line.split(' ');

    for (let i = 0; i < Number(stepsCount); i++) {
      head.x += directions[direction][0];
      head.y += directions[direction][1];

      if (Math.abs(tail.x - head.x) === 2) {
        tail.x += head.x > tail.x ? 1 : -1;
        if (tail.y !== head.y) {
          tail.y += head.y > tail.y ? 1 : -1;
        }
      }

      if (Math.abs(tail.y - head.y) === 2) {
        tail.y += head.y > tail.y ? 1 : -1;
        if (tail.x !== head.x) {
          tail.x += head.x > tail.x ? 1 : -1;
        }
      }

      pointsSet.add(`${tail.x},${tail.y}`);
    }
  }

  console.log(pointsSet.size);
}

nineOne();