const breakTag = '|break|';
const combineDataByGroup = (input) =>
  input.replace(/\n\n/g, breakTag).split(breakTag);

const getInputWithoutDuplicates = (input) =>
  combineDataByGroup(input)
    .map((rawRecord) => [...rawRecord.replace(/\n/g, '')]) // turn a group's data into one giant array
    .map((arrayWithDupes) => [...new Set(arrayWithDupes)]);

const getInputAsArrayOfArrays = (input) =>
  combineDataByGroup(input).map((groupData) =>
    groupData
      .split('\n') // explode string to arrays on separator
      .map((line) => [...line])
  ); // explode letters of string into array

export { getInputWithoutDuplicates, getInputAsArrayOfArrays };
