import { convertInputFileToArray } from '../utils.js';
import runCommandScript from './utils.js';

const input = convertInputFileToArray('./challenges/day8/input.txt');

const challengeOne = () => {
  const cmdOutput = runCommandScript(input);
  console.log(`acc before repeat is: ${cmdOutput.acc}`);
};

const challengeTwo = () => {
  const cmdOutput = runCommandScript(input);

  let newCmdOutput = {};
  Object.keys(cmdOutput.executedLines).every((key) => {
    if (input[key].substr(0, 3) === 'acc') {
      return true; // Skip acc lines
    }
    const newInput = [...input];
    // Swap statement for this line
    switch (input[key].substr(0, 3)) {
      case 'nop':
        newInput[key] = newInput[key].replace('nop', 'jmp');
        break;
      case 'jmp':
        newInput[key] = newInput[key].replace('jmp', 'nop');
        break;
      default:
        break;
    }
    // Test with new statement
    newCmdOutput = runCommandScript(newInput);
    // Keep running until the commandScript is flagged as having been finished or no more iterations
    return !newCmdOutput.finishedCommands;
  });

  console.log(
    newCmdOutput.finishedCommands
      ? `Commands finished successfully! acc is: ${newCmdOutput.acc}`
      : "Uh oh. Well that didn't work"
  );
};

const day8 = {
  challengeOne,
  challengeTwo,
};

export default day8;
