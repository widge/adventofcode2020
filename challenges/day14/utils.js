const convertToBinary = (number) => (+number).toString(2).padStart(36, '0');

const replaceCharAt = (string, replacementChar, index) =>
  string.substring(0, index) + replacementChar + string.substring(index + 1);

const applyMaskToBinary = (mask, binaryValue) => {
  mask.split('').forEach((char, index) => {
    // for any non-X characters swap the value in the array with that in the mast
    binaryValue =
      char === 'X' ? binaryValue : replaceCharAt(binaryValue, char, index);
  });

  // convert back to string and parse with radix of 2 to get base 10 number
  return parseInt(binaryValue, 2);
};
const applyMaskWithFloatingBits = (mask, binaryValue) => {
  // override any value in the binary with whats in the mask if the mask isn't 0 at that index
  mask.split('').forEach((char, index) => {
    binaryValue =
      char === '0' ? binaryValue : replaceCharAt(binaryValue, char, index);
  });
  const combinations = [binaryValue];

  // loop over combinations in array until there are no x's left in them
  while (combinations.join('').indexOf('X') !== -1) {
    combinations.forEach((combo, index) => {
      const xPos = combo.indexOf('X'); // find first x to replace with 0 / 1 combinations
      if (xPos > -1) {
        // add these two combinations to array and remove current index which has the X at this location
        combinations.push(replaceCharAt(combo, 1, xPos));
        combinations.push(replaceCharAt(combo, 0, xPos));
        combinations[index] = ''; // prefer to empty current val rather that use delete and have dangling indexes
      }
    });
  }

  // remove empty values and convert back to base 10
  return combinations
    .filter((val) => val !== '')
    .map((binaryVal) => parseInt(binaryVal, 2));
};

export { convertToBinary, applyMaskToBinary, applyMaskWithFloatingBits };
