/* eslint-disable no-loop-func */
import { convertInputFileToCharArrayByLine } from '../utils.js';
import {
  getAdjacentSeats,
  getFirstVisibleSeats,
  getNewSeatState,
  nestSeatStateOccurrences,
} from './utils.js';

const input = convertInputFileToCharArrayByLine('./challenges/day11/input.txt');

const challengeOne = () => {
  let currentArrangement = input;
  let arrangementChanged = false;
  let newArrangement = [];
  do {
    newArrangement = [];
    currentArrangement.forEach((row, rowIndex) => {
      newArrangement[rowIndex] = [];
      row.forEach((seatState, seatIndex) => {
        const data = {
          prevRow: rowIndex - 1,
          nextRow: rowIndex + 1 >= input.length ? -1 : rowIndex + 1,
          prevCol: seatIndex - 1 < 0 ? 0 : seatIndex - 1,
          nextCol: seatIndex + 1 === row.length ? seatIndex : seatIndex + 1,
          seatIndex,
          rowIndex,
        };

        const adjacentSeats = getAdjacentSeats(data, currentArrangement);
        newArrangement[rowIndex][seatIndex] = getNewSeatState(
          adjacentSeats,
          seatState
        );
      });
    });

    arrangementChanged =
      JSON.stringify(currentArrangement) !== JSON.stringify(newArrangement);

    currentArrangement = newArrangement;
  } while (arrangementChanged);

  const occupiedSeats = nestSeatStateOccurrences('#', newArrangement);
  console.log(`Final Occupied Seats ${occupiedSeats}`);
};

const challengeTwo = () => {
  let currentArrangement = input;
  let newArrangement = [];
  let arrangementHasChanged = false;
  do {
    newArrangement = [];
    currentArrangement.forEach((row, rowIndex) => {
      newArrangement[rowIndex] = [];
      row.forEach((seatState, seatIndex) => {
        const adjacentSeats = getFirstVisibleSeats(
          { seatIndex, rowIndex },
          currentArrangement
        );
        newArrangement[rowIndex][seatIndex] = getNewSeatState(
          adjacentSeats,
          seatState,
          5
        );
      });
    });

    arrangementHasChanged =
      JSON.stringify(currentArrangement) !== JSON.stringify(newArrangement);

    currentArrangement = newArrangement;
  } while (arrangementHasChanged);

  const occupiedSeats = nestSeatStateOccurrences('#', newArrangement);
  console.log(`Final Occupied Seats ${occupiedSeats}`);
};

const day11 = {
  challengeOne,
  challengeTwo,
};

export default day11;
