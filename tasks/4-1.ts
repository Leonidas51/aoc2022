import fs from 'fs';

const fourOne = async () => {
  const data = fs.readFileSync('./data/4.txt', 'utf8')
    .split('\n')
    .map(line =>
      line.split(',')
        .map(section =>
          section.split('-')
          .map(Number)));

    let result = 0;

    for (const line of data) {
      if (isIncluded(line[0], line[1])) {
        result++;
      }
    }

    console.log(result);
}

const isIncluded = (section1: number[], section2: number[]) => {
  if ((section1[0] >= section2[0] && section1[1] <= section2[1])
    || (section2[0] >= section1[0] && section2[1] <= section1[1])) {
    return true;
  }

  return false;
}

fourOne();