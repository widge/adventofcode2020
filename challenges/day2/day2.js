import { convertInputFileToArray } from '../utils.js';

const input = convertInputFileToArray('./challenges/day2/input.txt');

const challengeOne = () => {
  let total = 0;
  let validCount = 0;
  input.forEach((line) => {
    total++;
    const [policy, password] = line.split(': ');
    const [rule, letter] = policy.split(' ');
    const [min, max] = rule.split('-');

    const matches = password.match(RegExp(letter, 'gi'));

    if (matches && matches.length >= +min && matches.length <= +max) {
      validCount++;
    }
  });

  console.log(`${validCount} / ${total}`);
};

const challengeTwo = () => {
  let total = 0;
  let validCount = 0;
  input.forEach((line) => {
    total++;
    const [policy, password] = line.split(': ');
    const [rule, letter] = policy.split(' ');
    const [first, second] = rule.split('-');

    const firstLetter = password.substr(+first - 1, 1);
    const secondLetter = password.substr(+second - 1, 1);

    if (
      (firstLetter === letter || secondLetter === letter) &&
      firstLetter !== secondLetter
    ) {
      validCount++;
    }
  });

  console.log(`${validCount} / ${total}`);
};

const day2 = {
  challengeOne,
  challengeTwo,
};

export default day2;
