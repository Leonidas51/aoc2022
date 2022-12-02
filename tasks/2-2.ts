import fs from 'fs';

type Score = {
  outcomeScore: number;
  shapeScore: Record<string, number>;
};

const scores: Record<string, Score> = {
  X: {
    outcomeScore: 0,
    shapeScore: {
      A: 3,
      B: 1,
      C: 2,
    }
  },
  Y: {
    outcomeScore: 3,
    shapeScore: {
      A: 1,
      B: 2,
      C: 3,
    }
  },
  Z: {
    outcomeScore: 6,
    shapeScore: {
      A: 2,
      B: 3,
      C: 1,
    }
  }
};

const twoTwo = async () => {
  const data = fs.readFileSync('./data/2.txt', 'utf8').split('\n');

  let score = 0;

  for (const line of data) {
    score += scores[line[2]].outcomeScore;
    score += scores[line[2]].shapeScore[line[0]];
  }

  console.log(score);
}

twoTwo();