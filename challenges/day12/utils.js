const directionMap = ['N', 'E', 'S', 'W'];
const shiftDirectionRight = (movement, currentlyFacingKey) => {
  let newDirection = currentlyFacingKey + movement / 90; // basically gives us an array index we can use in directionMap;
  newDirection = newDirection > 3 ? newDirection - 4 : newDirection; // ensures array key is cyclic
  return directionMap[newDirection];
};
const shiftDirectionLeft = (movement, currentlyFacingKey) => {
  let newDirection = currentlyFacingKey - movement / 90; // basically gives us an array index we can use in directionMap;
  newDirection = newDirection < 0 ? newDirection + 4 : newDirection; // ensures array key is cyclic
  return directionMap[newDirection];
};
const calculateNewPosition = (positionObj, currentPosition) => {
  const currentlyFacingKey = directionMap.indexOf(positionObj.currentlyFacing);
  const direction =
    currentPosition.substr(0, 1) === 'F'
      ? positionObj.currentlyFacing
      : currentPosition.substr(0, 1);
  const movement = +currentPosition.substr(1);
  switch (direction) {
    case 'N':
      positionObj.northSouthPos += movement;
      break;
    case 'S':
      positionObj.northSouthPos -= movement;
      break;
    case 'E':
      positionObj.eastWestPos += movement;
      break;
    case 'W':
      positionObj.eastWestPos -= movement;
      break;
    case 'R':
      positionObj.currentlyFacing = shiftDirectionRight(
        movement,
        currentlyFacingKey
      );
      break;
    case 'L':
      positionObj.currentlyFacing = shiftDirectionLeft(
        movement,
        currentlyFacingKey
      );
      break;
    default:
      break;
  }
};

const shiftWaypointRight = (movement, positionObj) => {
  const positionObJClone = { ...positionObj }; // Clone it as we'll want original values when manipulating
  if (movement === 90) {
    positionObj.waypointNorthSouthPos =
      positionObJClone.waypointEastWestPos >= 0
        ? -Math.abs(positionObJClone.waypointEastWestPos)
        : Math.abs(positionObJClone.waypointEastWestPos);
    positionObj.waypointEastWestPos =
      positionObJClone.waypointNorthSouthPos >= 0
        ? Math.abs(positionObJClone.waypointNorthSouthPos)
        : -Math.abs(positionObJClone.waypointNorthSouthPos);
  }
  if (movement === 180) {
    positionObj.waypointNorthSouthPos = -positionObJClone.waypointNorthSouthPos;
    positionObj.waypointEastWestPos = -positionObJClone.waypointEastWestPos;
  }
  if (movement === 270) {
    positionObj.waypointEastWestPos =
      positionObJClone.waypointNorthSouthPos >= 0
        ? -Math.abs(positionObJClone.waypointNorthSouthPos)
        : Math.abs(positionObJClone.waypointNorthSouthPos);
    positionObj.waypointNorthSouthPos =
      positionObJClone.waypointEastWestPos >= 0
        ? Math.abs(positionObJClone.waypointEastWestPos)
        : -Math.abs(positionObJClone.waypointEastWestPos);
  }
};

const shiftWaypointLeft = (movement, positionObj) => {
  const positionObJClone = { ...positionObj }; // Clone it as we'll want original values when manipulating
  if (movement === 90) {
    positionObj.waypointNorthSouthPos =
      positionObJClone.waypointEastWestPos >= 0
        ? Math.abs(positionObJClone.waypointEastWestPos)
        : -Math.abs(positionObJClone.waypointEastWestPos);
    positionObj.waypointEastWestPos =
      positionObJClone.waypointNorthSouthPos >= 0
        ? -Math.abs(positionObJClone.waypointNorthSouthPos)
        : Math.abs(positionObJClone.waypointNorthSouthPos);
  }
  if (movement === 180) {
    positionObj.waypointNorthSouthPos = -positionObJClone.waypointNorthSouthPos;
    positionObj.waypointEastWestPos = -positionObJClone.waypointEastWestPos;
  }
  if (movement === 270) {
    positionObj.waypointEastWestPos =
      positionObJClone.waypointNorthSouthPos >= 0
        ? Math.abs(positionObJClone.waypointNorthSouthPos)
        : -Math.abs(positionObJClone.waypointNorthSouthPos);
    positionObj.waypointNorthSouthPos =
      positionObJClone.waypointEastWestPos >= 0
        ? -Math.abs(positionObJClone.waypointEastWestPos)
        : Math.abs(positionObJClone.waypointEastWestPos);
  }
};

const calculateNewPositionWithWaypoint = (positionObj, positionChange) => {
  const direction = positionChange.substr(0, 1);
  const movement = +positionChange.substr(1);

  switch (direction) {
    case 'N':
      positionObj.waypointNorthSouthPos += movement;
      break;
    case 'S':
      positionObj.waypointNorthSouthPos -= movement;
      break;
    case 'E':
      positionObj.waypointEastWestPos += movement;
      break;
    case 'W':
      positionObj.waypointEastWestPos -= movement;
      break;
    case 'R':
      shiftWaypointRight(movement, positionObj);
      break;
    case 'L':
      shiftWaypointLeft(movement, positionObj);
      break;
    case 'F':
      positionObj.northSouthPos += movement * positionObj.waypointNorthSouthPos;
      positionObj.eastWestPos += movement * positionObj.waypointEastWestPos;
      break;
    default:
      break;
  }
};

export { calculateNewPosition, calculateNewPositionWithWaypoint };
