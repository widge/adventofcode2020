import { convertInputFileToString } from '../utils.js';
import { takeTurn, takeTurnWithMap } from './utils.js';

const input = convertInputFileToString('./challenges/day15/input.txt').split(
  ','
);

const targetCount1 = 2020;
const targetCount2 = 30000000;

const challengeOne = () => {
  let numbers = [...input];
  let counter = 0;
  while (counter < targetCount1 - input.length) {
    numbers = takeTurn(numbers);
    counter++;
  }

  console.log(`${targetCount1}th number is: ${numbers.pop()}`);
};
const challengeTwo = () => {
  const numbers = new Map(); // I learnt today how Map is much more efficient than standard objects at rapid I/O
  input.forEach((number, index) => numbers.set(number, index + 1)); // set initial values and start at index 1 not 0
  numbers.delete(input[input.length - 1]); // but remove last one. That can be our starting value
  let nextNumber = input[input.length - 1]; // as above
  let counter = numbers.size; // counter to follow index
  while (counter < targetCount2 - 1) {
    nextNumber = takeTurnWithMap(numbers, nextNumber, counter);
    counter++;
  }

  console.log(`${targetCount2}th number is: ${nextNumber}`);
};

const day15 = {
  challengeOne,
  challengeTwo,
};

export default day15;
