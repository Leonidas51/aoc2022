import fs from 'fs';

const oneTwo = async () => {
  const data = fs.readFileSync('./data/1.txt', 'utf8').split('\n');

  let maxs = [0, 0, 0];
  let current = 0;

  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      const min = Math.min.apply(null, maxs)
      if (current > min) {
        maxs[maxs.indexOf(min)] = current;
      }

      current = 0;
      continue;
    }

    current += Number(data[i]);
  }

  const min = Math.min.apply(null, maxs)
  if (current > min) {
    maxs[maxs.indexOf(min)] = current;
  }

  console.log(maxs.reduce((prev, cur) => prev + cur, 0));
}

oneTwo();