import fs from 'fs';

const scores: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomes: Record<string, number> = {
  AZ: 0,
  BX: 0,
  CY: 0,
  AX: 3,
  BY: 3,
  CZ: 3,
  AY: 6,
  BZ: 6,
  CX: 6,
};

const twoOne = async () => {
  const data = fs.readFileSync('./data/2.txt', 'utf8').split('\n');

  let score = 0;

  for (const line of data) {
    score += outcomes[`${line[0]}${line[2]}`];
    score += scores[line[2]];
  }

  console.log(score);
}

twoOne();