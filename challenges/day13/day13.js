import { convertInputFileToArray } from '../utils.js';

const [timestamp, busIDString] = convertInputFileToArray(
  './challenges/day13/input.txt'
);
const busIDs = busIDString.split(',');

const challengeOne = () => {
  const nextBusTimesMap = {};
  busIDs
    .filter((busID) => busID !== 'x') // remove unwanted ids
    .map((busID) => parseInt(busID)) // ensure all are integers
    .forEach((busID) => {
      const timeToNextBus = busID - (timestamp % busID);
      nextBusTimesMap[timeToNextBus] = busID;
    });

  const nearestNextBus = Math.min(
    ...Object.keys(nextBusTimesMap).map((key) => +key) // Get keys, parse to ints and find lowest
  );
  console.log(
    `Next bus is #${nextBusTimesMap[nearestNextBus]} arriving in ${nearestNextBus} minutes`
  );
  console.log(
    `ID x Time to Wait is: ${nextBusTimesMap[nearestNextBus] * nearestNextBus}`
  );
};

const challengeTwo = () => {
  let earliestTimestamp = 1;
  let increment = 1;
  busIDs
    .filter((busID) => busID !== 'x')
    .forEach((busID) => {
      // get original index (not current iteration's index) - we need this because the x's are relevant to the sequence
      const index = busIDs.indexOf(busID);
      /**
       * Use mod to find the earliest time where this bus ID hits a clean multiple of the bus's index + the
       * earliestTimestamp.
       * We include the index here so the timestamp check is for the next in the sequence of buses - its a sequence of
       * times we're after, not a timestamp they all hit)
       */
      while ((index + earliestTimestamp) % +busID !== 0) {
        // go up by increment to keep in divisible range of previous buses (comment on line 44)
        earliestTimestamp += increment;
      }
      /**
       * multiply increment by this bus's ID (i.e. its timetable loop time) for next iteration.
       * we do this because we know that any multiple of this increment will still cleanly divide
       * into all previous bus IDs. ...Because Maths
       */
      increment *= +busID;
    });

  console.log(
    `Earliest timestamp for Gold Coin Sequence: ${earliestTimestamp}`
  );
};

const day13 = {
  challengeOne,
  challengeTwo,
};

export default day13;
