import {convertInputFileToArray } from "../utils.js";
import {getSeatIds} from "./utils.js";

const input = convertInputFileToArray('./challenges/day5/input.txt');

const challengeOne = ( ) => {

  const seatIDs = getSeatIds(input);

  console.log(`Highest Seat ID: ${Math.max(...seatIDs)}`);
}

const challengeTwo = () => {

  const seatIDs = getSeatIds(input);
  seatIDs.sort((a,b) => a - b);

  let lastID = seatIDs[0];
  seatIDs.every((seatID) => {

    if(seatID === lastID || seatID === lastID + 1){
      lastID = seatID;
      return true;
    }

    lastID = lastID + 1;
    return false;
  })

  console.log(`My Seat ID is: ${lastID}`);
}

const day5 = {
  challengeOne,
  challengeTwo
}

export { day5 };
