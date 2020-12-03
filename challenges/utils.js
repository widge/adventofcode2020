import fs from 'fs';

const convertInputFileToArray = (filepath) => {

  return fs.readFileSync(filepath).toString().split("\n");
}

const challengeWrapper = (day, challengeFunctions) => {

  console.log("", `\n###### Day ${day} ######`);
  Object.entries(challengeFunctions).map(([label, challengeFunc]) => {

  console.log("", `\n## Challenge ${label} ##`);
  console.time("Executed in: ");
  challengeFunc();
  console.timeEnd("Executed in: ");
  });
};

export { convertInputFileToArray, challengeWrapper };