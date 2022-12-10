import fs from 'fs';

const tenTwo = async () => {
  const data = fs.readFileSync('./data/10.txt', 'utf8').split('\n');

  const display: string[][] = new Array(6).fill(null).map(_ => {
    return new Array(40).fill('.');
  })

  let signal = 1;
  let currentCycle = 1;

  for (const line of data) {
    recordSignal(display, signal, currentCycle);
    currentCycle++;

    if (line?.startsWith('addx')) {
      const [_, val] = line.split(' ');
      
      signal += Number(val);
      recordSignal(display, signal, currentCycle);
      currentCycle++;
    }
  }

  recordSignal(display, signal, currentCycle);

  console.log(display.map(line => line.join('')).join('\n'));
}

const recordSignal = (display: string[][], signal: number, cycle: number) => {
  let row = 0;
  let cycleFlat = cycle;

  while (cycleFlat > 40) {
    row++;
    cycleFlat -= 40;
  }

  if (cycleFlat >= signal - 1 && cycleFlat <= signal + 1) {
    display[row][cycleFlat - 1] = '█';
  }
}

tenTwo();