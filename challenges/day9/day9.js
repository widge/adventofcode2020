import { convertInputFileToArray } from '../utils.js';
import {
  canMakeSumInRange,
  canNextContiguousNumbersHitTarget,
} from './utils.js';

const input = convertInputFileToArray('./challenges/day9/input.txt');
const preamble = 25;

const challengeOne = (logOut = true) => {
  let currentNo = 0;
  input.every((number, index) => {
    currentNo = number;
    if (index < preamble) {
      return true; // skip first preamble
    }
    // take relevant preamble range from array
    return canMakeSumInRange(+number, input.slice(index - preamble, index));
  });

  if (logOut) {
    console.log(`First non-summable number: ${currentNo}`);
  }
  return currentNo;
};

const challengeTwo = () => {
  const targetNumber = challengeOne(false);
  let contiguousResponse = {};
  input.some((number, index) => {
    const range = input.slice(index);
    contiguousResponse = canNextContiguousNumbersHitTarget(targetNumber, range);
    return contiguousResponse.success; // stop iterating on success
  });

  contiguousResponse.range.sort((a, b) => a - b);
  const sumOfMinAndMax =
    +contiguousResponse.range[0] + +contiguousResponse.range.pop();

  console.log(`Smallest + Largest from contiguous range is: ${sumOfMinAndMax}`);
};

const day9 = {
  challengeOne,
  challengeTwo,
};

export default day9;
