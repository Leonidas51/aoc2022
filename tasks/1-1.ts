import fs from 'fs';

const oneOne = async () => {
  const data = fs.readFileSync('./data/1.txt', 'utf8').split('\n');

  let max = 0;
  let current = 0;

  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      if (current > max) {
        max = current
      }

      current = 0;
      continue;
    }

    current += Number(data[i]);
  }

  console.log(max);
}

oneOne();