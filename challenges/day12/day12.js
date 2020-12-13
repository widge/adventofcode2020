import { convertInputFileToArray } from '../utils.js';
import {
  calculateNewPosition,
  calculateNewPositionWithWaypoint,
} from './utils.js';

const input = convertInputFileToArray('./challenges/day12/input.txt');

const challengeOne = () => {
  const positionObj = {
    northSouthPos: 0,
    eastWestPos: 0,
    currentlyFacing: 'E',
  };

  input.forEach((position) => {
    calculateNewPosition(positionObj, position);
  });

  console.log(
    `N/S: ${Math.abs(positionObj.northSouthPos)} E/W: ${Math.abs(
      positionObj.eastWestPos
    )}`
  );
  const manhattanDistance =
    Math.abs(positionObj.northSouthPos) + Math.abs(positionObj.eastWestPos);
  console.log(`Manhattan Distance ${manhattanDistance}`);
};

const challengeTwo = () => {
  const positionObj = {
    northSouthPos: 0,
    eastWestPos: 0,
    waypointNorthSouthPos: 1,
    waypointEastWestPos: 10,
  };

  input.forEach((position) => {
    calculateNewPositionWithWaypoint(positionObj, position);
  });

  console.log(
    `N/S: ${Math.abs(positionObj.northSouthPos)} E/W: ${Math.abs(
      positionObj.eastWestPos
    )}`
  );

  const manhattanDistance =
    Math.abs(positionObj.northSouthPos) + Math.abs(positionObj.eastWestPos);
  console.log(`Manhattan Distance ${manhattanDistance}`);
};

const day12 = {
  challengeOne,
  challengeTwo,
};

export default day12;
