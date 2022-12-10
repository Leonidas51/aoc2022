import fs from 'fs';

const tenOne = async () => {
  const data = fs.readFileSync('./data/10.txt', 'utf8').split('\n');

  const signalMap = {
    20: null,
    60: null,
    100: null,
    140: null,
    180: null,
    220: null,
  };

  let signal = 1;
  let currentCycle = 1;

  for (const line of data) {
    recordSignal(signalMap, signal, currentCycle);
    currentCycle++;

    if (line?.startsWith('addx')) {
      const [_, val] = line.split(' ');
      
      recordSignal(signalMap, signal, currentCycle);
      currentCycle++;
      signal+= Number(val);
    }
  }

  recordSignal(signalMap, signal, currentCycle);
  console.log(Object.values(signalMap).reduce((prev, curr) => prev + (curr || 0), 0));
}

const recordSignal = (signalMap: Record<number, number | null>, signal: number, cycle: number) => {
  if (signalMap.hasOwnProperty(cycle)) {
    signalMap[cycle] = signal * cycle;
  }
}

tenOne();