import fs from 'fs';

const threeOne = async () => {
  const data = fs.readFileSync('./data/3.txt', 'utf8').split('\n');

  const badges: string[] = [];
  const groups = [];

  for (let i = 0; i < data.length; i += 3) {
    groups.push(data.slice(i, i + 3));
  }

  for (const group of groups) {
    const items: Record<string, number> = {};

    for (const line of group) {
      const localItems: Record<string, boolean> = {};

      for (const char of line) {
        if (!localItems[char]) {
          localItems[char] = true;

          if (!items[char]) {
            items[char] = 1;
          } else {
            items[char] += 1;
          }
        }
      }
    }

    for (const key in items) {
      if (items[key] === 3) {
        badges.push(key);
      }
    }
  }

  let result = 0;

  for (const char of badges) {
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