import fs from 'fs';

const convertInputFileToArray = (filepath) => {

  return convertInputFileToString(filepath).split("\n");
}

const convertInputFileToString = (filepath) => {

  return fs.readFileSync(filepath).toString();
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

export { convertInputFileToArray, convertInputFileToString, challengeWrapper };