const takeTurn = (numbers) => {
  const lastNumber = numbers[numbers.length - 1];
  const lastPosInList = numbers
    .slice(0, numbers.length - 1)
    .lastIndexOf(lastNumber);
  if (lastPosInList > -1) {
    numbers.push(`${numbers.length - 1 - lastPosInList}`);
  } else {
    numbers.push('0');
  }

  return numbers;
};

const takeTurnWithMap = (numbers, nextNumber, counter) => {
  const tempNextNumber = numbers.has(nextNumber)
    ? counter + 1 - numbers.get(nextNumber)
    : '0';
  numbers.set(nextNumber, counter + 1);
  return tempNextNumber.toString();
};

export { takeTurn, takeTurnWithMap };
