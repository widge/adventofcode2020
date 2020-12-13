import { convertInputFileToArray } from '../utils.js';

const input = convertInputFileToArray('./challenges/day10/input.txt');
const adapters = [...input].sort((a, b) => a - b); // clone array so we dont modify it for challenge 2
adapters.unshift('0'); // include charging outlet
adapters.push((+adapters[adapters.length - 1] + 3).toString()); // include in-built adapter

const challengeOne = () => {
  let oneJoltDifferences = 0;
  let threeJoltDifferences = 0;
  adapters.forEach((adapter, index) => {
    if (index > 0) {
      const difference = parseInt(adapter) - parseInt(adapters[index - 1]);
      switch (difference) {
        case 1:
          oneJoltDifferences++;
          break;
        case 3:
          threeJoltDifferences++;
          break;
        default:
          console.log('Something went wrong!');
      }
    }
  });

  console.log(
    `The differences multiplied is: ${
      oneJoltDifferences * threeJoltDifferences
    }`
  );
};

const challengeTwo = () => {
  const adapterGroups = [];
  let groupStart = 0;
  /**
   * Break the adapters up into groups where the adapters are only 1 jolt apart - i.e. separate whenever we
   * hit a 3 jolt gap
   * We do this because you can't change the adapter combinations across a 3 jolt gap anyway, so we're breaking the
   * problem into smaller segments which we'll multiply together later to work out the combination of combinations
   */
  adapters.forEach((adapter, index) => {
    if (index === 0 || index === adapters.length - 1) {
      return false; // skip first and last elements
    }
    // since last element is always +3 from last-1 we'll always get a complete group
    // before the final iteration
    if (parseInt(adapters[index + 1]) - parseInt(adapter) === 3) {
      adapterGroups.push(adapters.slice(groupStart, index + 1));
      groupStart = index + 1;
    }
  });

  /**
   * In a group, the first and last values are 'locked' since they have a difference of 3 from the previous and
   * following group. This means only the values between those two can have multiple combinations, and even then
   * those combinations have to follow the rule of no more than a gap of 3.
   *
   * After lots (and lots and lots and lots) of trial and error / experimentation I decided to manually work out
   * the number of combinations for groups of 3, 4 and 5 items. I discovered (via pasting my findings into google)
   * that this apparently follows the Tribonacci pattern!
   */
  // The below is a shortcut to instantly know how many combinations any given group size has (up to a size of 8)
  const tribonacci = [0, 0, 1, 2, 4, 7, 13, 24, 44];
  const total = adapterGroups.reduce((accumulator, group) => {
    const combinationCount = tribonacci[group.length];
    // multiply the combinations of each (relevant) group together to get total combinations for whole list
    accumulator *= combinationCount > 1 ? combinationCount : 1;
    return accumulator;
  }, 1);

  console.log(`Total combinations is: ${total}`);
};

const day10 = {
  challengeOne,
  challengeTwo,
};

export default day10;
