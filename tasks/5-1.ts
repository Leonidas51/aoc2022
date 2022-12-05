import fs from 'fs';

type Command = {
  count: number;
  from: number;
  to: number;
}

const fiveOne = async () => {
  const data = fs.readFileSync('./data/5.txt', 'utf8').split('\n');

  let result = '';
  const {stacks, commands} =  parseInput(data);

  for (const cmd of commands) {
    for (let i = 0; i < cmd.count; i++) {
      if (stacks[cmd.from].length > 0) {
        const crate = stacks[cmd.from].pop();
        stacks[cmd.to].push(crate as string);
      }
    }
  }

  for (const stack of stacks) {
    result += stack[stack.length - 1];
  }

  console.log(result);
}

const parseInput = (data: string[]) => {
  const commands: Command[] = [];
  const stacks: string[][] = [];

  const dividerIndex = data.findIndex(line => line === '');
  const stacksCounterLine = data[dividerIndex - 1];

  // find a number, then go up adding every letter above it
  for (let i = 0; i < stacksCounterLine.length; i++) {
    if (stacksCounterLine[i] === ' ') continue;

    for (let j = dividerIndex - 2; j >= 0; j--) {
      const crateLine = data[j];

      if (crateLine[i] === ' ') break;

      const stackIndex = Number(stacksCounterLine[i]) - 1;

      if (!stacks[stackIndex]) {
        stacks[stackIndex] = [];
      }

      stacks[Number(stacksCounterLine[i]) - 1].push(crateLine[i]);
    }
  }

  for (let i = dividerIndex + 1; i < data.length; i++) {
    const line = data[i];

    const match = (/move (\d+) from (\d+) to (\d+)/g).exec(line);

    commands.push({
      count: Number(match?.[1]),
      from: Number(match?.[2]) - 1,
      to: Number(match?.[3]) - 1,
    });
  }

  return { commands, stacks };
};

fiveOne();