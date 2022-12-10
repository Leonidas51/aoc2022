import fs from 'fs';

type Point = {
  x: number;
  y: number;
}

const directions: Record<string, [number, number]> = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

const nineTwo = async () => {
  const data = fs.readFileSync('./data/9.txt', 'utf8').split('\n');

  const rope: Point[] = new Array(10).fill(null).map(_ => { return { x: 0, y: 0 } });

  const pointsSet = new Set<string>();

  for (const line of data) {
    const [direction, stepsCount] = line.split(' ');

    for (let i = 0; i < Number(stepsCount); i++) {
      rope[0].x += directions[direction][0];
      rope[0].y += directions[direction][1];

      for (let j = 0; j < rope.length - 1; j++) {
        const endPoint = moveTail(rope[j], rope[j + 1]);

        if (j === rope.length - 2) {
          pointsSet.add(endPoint);
        }
      }
    }
  }

  console.log(pointsSet.size);
}

const moveTail = (head: Point, tail: Point) => {
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

  return `${tail.x},${tail.y}`;
}

nineTwo();