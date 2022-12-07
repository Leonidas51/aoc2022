import fs from 'fs';

type File = {
  size: number;
  name: string;
};

type Directory = {
  parent?: Directory;
  directories: Record<string, Directory>;
  files: File[];
};

const sevenOne = async () => {
  const data = fs.readFileSync('./data/7.txt', 'utf8').split('\n');

  const root: Directory = { files: [], directories: {} };
  let current = root;

  for (let i = 1; i < data.length; i++) {
    const line = data[i];

    if (!line.startsWith('$')) {
      if (line.startsWith('dir')) {
        current.directories[line.slice(4)] = { parent: current, files: [], directories: {} };
      } else {
        const [size, name] = line.split(' ');
  
        current.files.push({ size: Number(size), name });
      }
    } else if (line.startsWith('$ cd')) {
      const destination = line.split(' ')[2];

      if (destination === '..') {
        if (current.parent) {
          current = current.parent;
        }
      } else {
        current = current.directories[destination];
      }
    }
  }


  const calculator = Calculator();
  const unused = 70000000 - calculator.calc(root);
  const sizeToFree = 30000000 - unused;

  calculator.calc(root, sizeToFree);

  console.log(calculator.getResult());
}

function Calculator() {
  let aboveThresholdMinSize = Infinity;

  const calc = (root: Directory, threshold?: number) => {
    let size = 0;

    for (const file of root.files) {
      size += file.size;
    }

    for (const directory in root.directories) {
      size += calc(root.directories[directory], threshold);
    }

    if (threshold && size >= threshold) {
      aboveThresholdMinSize = Math.min(size, aboveThresholdMinSize);
    }

    return size;
  }

  const getResult = () => aboveThresholdMinSize;

  return { calc, getResult };
}

sevenOne();