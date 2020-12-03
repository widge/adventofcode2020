import fs from 'fs';

const convertInputFileToArray = (filepath) => {

  return fs.readFileSync(filepath).toString().split("\n");
}

export { convertInputFileToArray };