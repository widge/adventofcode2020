import { convertInputFileToArray } from '../utils.js';
import {
  applyMaskToBinary,
  applyMaskWithFloatingBits,
  convertToBinary,
} from './utils.js';

const input = convertInputFileToArray('./challenges/day14/input.txt');

const challengeOne = () => {
  let currentMask = '';
  const memoryAddresses = {};
  input.forEach((line) => {
    if (line.indexOf('mask') >= 0) {
      currentMask = line.split(' = ').pop();
    } else {
      // extract mem location as integer via as well as value for this lie
      const [memLocation, value] = line.replace(/mem\[|\]/g, '').split(' = ');
      memoryAddresses[memLocation] = applyMaskToBinary(
        currentMask,
        convertToBinary(value)
      );
    }
  });

  const sum = Object.values(memoryAddresses).reduce((accumulator, value) => {
    accumulator += value;
    return accumulator;
  }, 0);

  console.log(`Sum is: ${sum}`);
};

const challengeTwo = () => {
  let currentMask = '';
  const memoryAddresses = {};
  input.forEach((line) => {
    if (line.indexOf('mask') >= 0) {
      currentMask = line.split(' = ').pop();
    } else {
      const [memLocation, value] = line.replace(/mem\[|\]/g, '').split(' = ');
      const locations = applyMaskWithFloatingBits(
        currentMask,
        convertToBinary(memLocation)
      );

      // add the current value to the new memory locations in main list
      locations.forEach((address) => {
        memoryAddresses[address] = value;
      });
    }
  });

  const sum = Object.values(memoryAddresses).reduce((acc, val) => {
    acc += +val;
    return acc;
  }, 0);

  console.log(`Sum is: ${sum}`);
};

const day14 = {
  challengeOne,
  challengeTwo,
};

export default day14;
