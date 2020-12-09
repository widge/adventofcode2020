import { convertInputFileToArray } from '../utils.js';
import { buildTreeForChildBags, findParentBags } from './utils.js';

const input = convertInputFileToArray('./challenges/day7/input.txt');
const inputKeyValues = input.map((string) => string.split(' contain ')); // split on the word contain

const startBag = 'shiny gold bag';

const challengeOne = () => {
  const relevantBags = findParentBags(inputKeyValues, startBag, []);
  const uniqueRelevantBags = [...new Set(relevantBags)];
  console.log(`Total Bags ${uniqueRelevantBags.length}`);
};

const challengeTwo = () => {
  const relevantBagTree = buildTreeForChildBags(inputKeyValues, startBag, []);
  let counter = 0;
  const bagTreeCounter = (bagBranch, previousCount = 1) => {
    Object.keys(bagBranch).forEach((bagName) => {
      const thisBagCount = parseInt(bagName.substr(0, 1), 10) * previousCount;
      counter += thisBagCount;
      bagTreeCounter(bagBranch[bagName], thisBagCount);
    });
  };
  bagTreeCounter(relevantBagTree);
  console.log(`Total bags ${counter}`);
};

const day7 = {
  challengeOne,
  challengeTwo,
};

export default day7;
