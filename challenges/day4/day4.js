import {convertInputFileToString} from "../utils.js"
import { allRequiredFieldsPresent, normaliseInput, validators } from "./utils.js";

const input = convertInputFileToString('./challenges/day5/input.txt');
const normalisedData = normaliseInput(input);

const challengeOne = () => {

  let validCounter = 0;
  normalisedData.forEach((passport) => {

    validCounter += allRequiredFieldsPresent(passport) ? 1 : 0;
  });

  console.log(`Valid passports: ${validCounter}`);
}

const challengeTwo = () => {

  let validCounter = 0;
  normalisedData.forEach((passport) => {

    if(allRequiredFieldsPresent(passport)){
      const validPassport = Object.entries(passport).every(([key, value]) => validators[key](value));
      validCounter += validPassport ? 1: 0;
    }
  });

  console.log(`Valid passports: ${validCounter}`);
}

const day4 = {
  challengeOne,
  challengeTwo
}

export { day4 };
