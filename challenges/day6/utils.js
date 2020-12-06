const breakTag = "|break|";
const combineDataByGroup = (input) => {

  return input.replace(/\n\n/g,breakTag)
  .split(breakTag);
}

const getInputWithoutDuplicates = (input) => {

  return combineDataByGroup(input)
    .map((rawRecord) => [...rawRecord.replace(/\n/g, "")]) // turn a group's data into one giant array
    .map((arrayWithDupes) => [...new Set(arrayWithDupes)])
}

const getInputAsArrayOfArrays = (input) => {
  return combineDataByGroup(input)
    .map(groupData => groupData.split("\n") // explode string to arrays on separator
    .map((line) => [...line])); // explode letters of string into array
}

export { getInputWithoutDuplicates, getInputAsArrayOfArrays };