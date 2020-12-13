const seatStateOccurrences = (checkState, seatArray) =>
  seatArray.filter((seatState) => checkState === seatState).length;

const nestSeatStateOccurrences = (checkState, nestedSeatArray) =>
  nestedSeatArray.reduce((accumulator, seatArray) => {
    accumulator += seatStateOccurrences(checkState, seatArray);
    return accumulator;
  }, 0);

const getAdjacentSeats = (data, currentArrangement) => {
  let adjacentSeats = [];
  if (data.prevRow >= 0) {
    adjacentSeats = [
      ...adjacentSeats,
      ...currentArrangement[data.prevRow].slice(data.prevCol, data.nextCol + 1),
    ];
  }
  if (data.nextRow > 0) {
    adjacentSeats = [
      ...adjacentSeats,
      ...currentArrangement[data.nextRow].slice(data.prevCol, data.nextCol + 1),
    ];
  }
  if (data.prevCol !== data.seatIndex) {
    adjacentSeats.push(currentArrangement[data.rowIndex][data.prevCol]);
  }
  if (data.nextCol !== data.seatIndex) {
    adjacentSeats.push(currentArrangement[data.rowIndex][data.nextCol]);
  }

  return adjacentSeats;
};

const getNewSeatState = (
  adjacentSeats,
  currentSeatState,
  occupiedSeatTolerance = 4
) => {
  if (currentSeatState === 'L') {
    return seatStateOccurrences('#', adjacentSeats) === 0
      ? '#'
      : currentSeatState;
  }
  if (currentSeatState === '#') {
    return seatStateOccurrences('#', adjacentSeats) >= occupiedSeatTolerance
      ? 'L'
      : currentSeatState;
  }
  return currentSeatState;
};

const lookForSeat = (currentArrangement, data) => {
  let seatState = '.';
  let row = data.startRow + data.rowStepper;
  let seat = data.startSeat + data.seatStepper;
  while (
    row >= 0 &&
    row < data.rowCount &&
    seat >= 0 &&
    seat < data.seatCount &&
    seatState === '.'
  ) {
    seatState = currentArrangement[row][seat];
    row += data.rowStepper;
    seat += data.seatStepper;
  }
  return seatState;
};

const getFirstVisibleSeats = (data, currentArrangement) => {
  const lookObj = {
    rowCount: currentArrangement.length,
    seatCount: currentArrangement[0].length,
    startRow: data.rowIndex,
    startSeat: data.seatIndex,
  };
  const adjacentSeats = [
    // up
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: -1,
      seatStepper: 0,
    }),
    // up-right
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: -1,
      seatStepper: 1,
    }),
    // right
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: 0,
      seatStepper: 1,
    }),
    // down-right
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: 1,
      seatStepper: 1,
    }),
    // down
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: 1,
      seatStepper: 0,
    }),
    // down-left
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: 1,
      seatStepper: -1,
    }),
    // left
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: 0,
      seatStepper: -1,
    }),
    // up-left
    lookForSeat(currentArrangement, {
      ...lookObj,
      rowStepper: -1,
      seatStepper: -1,
    }),
  ];

  return adjacentSeats;
};

export {
  seatStateOccurrences,
  nestSeatStateOccurrences,
  getAdjacentSeats,
  getNewSeatState,
  getFirstVisibleSeats,
};
