const canMakeSumInRange = (target, range) =>
  range.some((number) =>
    // exclude self & if we can find a value in the array
    // that's the target minus current number, its the one we want
    target - number !== number
      ? range.indexOf((target - number).toString()) > -1
      : false
  );

const canNextContiguousNumbersHitTarget = (target, inputRange) => {
  const contiguousResponse = { success: false, range: [] }; // using object for response to simplify data retrieval in caller
  let accumulator = 0;
  inputRange.some((number) => {
    // add current number to our response range in case this range is successful
    contiguousResponse.range.push(number);
    accumulator += parseInt(number);
    if (parseInt(accumulator) === parseInt(target)) {
      contiguousResponse.success = true;
    }
    // if we hit or exceed the target stop iterating
    return parseInt(accumulator) >= parseInt(target);
  });

  return contiguousResponse;
};

export { canMakeSumInRange, canNextContiguousNumbersHitTarget };
