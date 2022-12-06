import fs from 'fs';

const sixOne = async () => {
  const data = fs.readFileSync('./data/6.txt', 'utf8');

  let result = -1;

  for (let i = 0; i < data.length; i++) {
    const substr = data.slice(i, i + 4);

    if (substr.length === 4 && hasNoDupes(substr)) {
      result = i + 4;
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

sixOne();