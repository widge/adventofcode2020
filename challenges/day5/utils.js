const totalRows = 127;
const totalColumns = 7;

const getPartitionLimit = (seatObj, character) => {
  switch (character) {
    case 'B':
      seatObj.rowStart = Math.ceil((seatObj.rowStart + seatObj.rowEnd) / 2);
      break;
    case 'F':
      seatObj.rowEnd = Math.floor((seatObj.rowStart + seatObj.rowEnd) / 2);
      break;
    case 'R':
      seatObj.colStart = Math.ceil((seatObj.colStart + seatObj.colEnd) / 2);
      break;
    case 'L':
      seatObj.colEnd = Math.floor((seatObj.colStart + seatObj.colEnd) / 2);
      break;
    default:
      break;
  }
};

const getSeatIds = (input) => {
  const seatIDs = [];
  input.forEach((seat) => {
    const seatArray = [...seat];

    const seatObj = {
      rowStart: 0,
      rowEnd: totalRows,
      colStart: 0,
      colEnd: totalColumns,
    };

    seatArray.forEach((character) => {
      getPartitionLimit(seatObj, character);
    });

    seatIDs.push(seatObj.rowStart * 8 + seatObj.colStart);
  });

  return seatIDs;
};

export default getSeatIds;
