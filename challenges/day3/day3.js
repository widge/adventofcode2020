import { convertInputFileToArray }from "../utils.js"

const input = convertInputFileToArray('./challenges/day3/input.txt')

const navigateDownSlope = (positionShift, lineShift = 1) => {

  let position = 0;
  let trees = 0;
  let lineNo = 0;
  input.forEach((line) => {

    const lineAsArray = line.split("");
    // is current line no. dividable by number of lines to shift
    const shouldCheckLine = lineNo % lineShift === 0;

    trees += shouldCheckLine && lineAsArray[position] === "#" ? 1 : 0;
    position += shouldCheckLine ? positionShift : 0;
    // If position extends past end of a line, move the relevant
    // number of places in from the start of the next line (-31 because first position is 0)
    position = position > 30 ? position - 31: position;
    lineNo++;
  });

  console.log(`Total Trees for shifting ${positionShift} Right, ${lineShift} Down: ${trees}`);
  return trees;
};

const challengeOne = () => {

  navigateDownSlope(3);
}

const challengeTwo = () => {

  let multiplier = navigateDownSlope(1);
  multiplier *= navigateDownSlope(3);
  multiplier *= navigateDownSlope(5);
  multiplier *= navigateDownSlope(7);
  multiplier *= navigateDownSlope(1,2);

  console.log(`Multiplied total: ${multiplier}`);
}

const day3 = {
  challengeOne,
  challengeTwo
}

export { day3 };
