import {convertInputFileToString } from "../utils.js";
import {getInputAsArrayOfArrays, getInputWithoutDuplicates} from "./utils.js";

const input = convertInputFileToString('./challenges/day6/input.txt');

const challengeOne = ( ) => {

  const inputWithoutDuplicates = getInputWithoutDuplicates(input); // remove duplicates in array

  let sum = 0;
  inputWithoutDuplicates.forEach((groupUniques) => {
    sum += groupUniques.length;
  });

  console.log(`Sum of uniques is ${sum}`);
}

const challengeTwo = () => {

  const inputDataAsArrays = getInputAsArrayOfArrays(input);

  let sum = 0;
  inputDataAsArrays.forEach((groupArrays) => {
    // find letters that exist in all arrays within a group
    const intersections = groupArrays
      .reduce((accumulator, line) =>  accumulator
        .filter(letter => line.includes(letter)));

    sum += intersections.length
  })

  console.log(`Sum of group intersections is ${sum}`);
}

const day6 = {
  challengeOne,
  challengeTwo
}

export { day6 };
