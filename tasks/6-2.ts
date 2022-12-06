import fs from 'fs';

const sixTwo = async () => {
  const data = fs.readFileSync('./data/6.txt', 'utf8');

  let result = -1;

  for (let i = 0; i < data.length; i++) {
    const substr = data.slice(i, i + 14);

    if (substr.length === 14 && hasNoDupes(substr)) {
      result = i + 14;
      break;
    }
  }

  console.log(result);
}

const hasNoDupes = (str: string) => {
  const hash: Record<string, boolean> = {};

  for (const char of str) {
    if (hash[char]) {
      return false;
    }

    hash[char] = true;
  }

  return true;
}

sixTwo();