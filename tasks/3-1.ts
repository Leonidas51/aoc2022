import fs from 'fs';

const threeOne = async () => {
  const data = fs.readFileSync('./data/3.txt', 'utf8').split('\n');

  const duplicates = [];

  for (const line of data) {
    const items: Record<string, boolean> = {};

    for (let i = 0; i < line.length / 2; i++) {
      items[line[i]] = true;
    }

    for (let i = line.length / 2; i < line.length; i++) {
      if (items[line[i]]) {
        duplicates.push(line[i]);
        break;
      }
    }
  }

  let result = 0;

  for (const char of duplicates) {
    if (isLowerCase(char)) {
      result += char.charCodeAt(0) - 96;
    } else {
      result += char.charCodeAt(0) - 38;
    }
  }

  console.log(result);
}

const isLowerCase = (char: string) => 
  char.charCodeAt(0) === char.toLowerCase().charCodeAt(0);

threeOne();