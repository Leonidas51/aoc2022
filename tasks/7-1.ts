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
  calculator.calc(root);

  console.log(calculator.getResult());
}

function Calculator() {
  let belowThresholdSizes = 0;

  const calc = (root: Directory) => {
    let size = 0;

    for (const file of root.files) {
      size += file.size;
    }

    for (const directory in root.directories) {
      size += calc(root.directories[directory]);
    }

    if (size <= 100000) {
      belowThresholdSizes += size;
    }

    return size;
  }

  const getResult = () => belowThresholdSizes;

  return { calc, getResult };
}

sevenOne();