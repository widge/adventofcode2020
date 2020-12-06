import fs from 'fs';

const convertInputFileToString = (filepath) =>
  fs.readFileSync(filepath).toString();
const convertInputFileToArray = (filepath) =>
  convertInputFileToString(filepath).split('\n');

const challengeWrapper = (day, challengeFunctions) => {
  console.log('', `\n###### Day ${day} ######`);
  Object.entries(challengeFunctions).forEach(([label, challengeFunc]) => {
    console.log('', `\n## Challenge ${label} ##`);
    console.time('Executed in: ');
    challengeFunc();
    console.timeEnd('Executed in: ');
  });
};

export { convertInputFileToArray, convertInputFileToString, challengeWrapper };
