import { challengeWrapper } from './challenges/utils.js';
import day1 from './challenges/day1/day1.js';
import day2 from './challenges/day2/day2.js';
import day3 from './challenges/day3/day3.js';
import day4 from './challenges/day4/day4.js';
import day5 from './challenges/day5/day5.js';
import day6 from './challenges/day6/day6.js';
import day7 from './challenges/day7/day7.js';
import day8 from './challenges/day8/day8.js';
import day9 from './challenges/day9/day9.js';
import day10 from './challenges/day10/day10.js';
import day11 from './challenges/day11/day11.js';
import day12 from './challenges/day12/day12.js';
import day13 from './challenges/day13/day13.js';
import day14 from './challenges/day14/day14.js';
import day15 from './challenges/day15/day15.js';

const args = process.argv.slice(2);
const filter = args && args.length > 0 ? args[0] : '';

if (!filter) {
  challengeWrapper(1, {
    1: day1.challengeOne,
    '1 v2': day1.challengeHashmap,
    2: day1.challengeTwo,
  });
  challengeWrapper(2, { 1: day2.challengeOne, 2: day2.challengeTwo });
  challengeWrapper(3, { 1: day3.challengeOne, 2: day3.challengeTwo });
  challengeWrapper(4, { 1: day4.challengeOne, 2: day4.challengeTwo });
  challengeWrapper(5, { 1: day5.challengeOne, 2: day5.challengeTwo });
  challengeWrapper(6, { 1: day6.challengeOne, 2: day6.challengeTwo });
  challengeWrapper(7, { 1: day7.challengeOne, 2: day7.challengeTwo });
  challengeWrapper(8, { 1: day8.challengeOne, 2: day8.challengeTwo });
  challengeWrapper(9, { 1: day9.challengeOne, 2: day9.challengeTwo });
  challengeWrapper(10, { 1: day10.challengeOne, 2: day10.challengeTwo });
  challengeWrapper(11, { 1: day11.challengeOne, 2: day11.challengeTwo });
  challengeWrapper(12, { 1: day12.challengeOne, 2: day12.challengeTwo });
  challengeWrapper(13, { 1: day13.challengeOne, 2: day13.challengeTwo });
  challengeWrapper(14, { 1: day14.challengeOne, 2: day14.challengeTwo });
}

if (!filter || filter === 'latest') {
  challengeWrapper(14, { 1: day15.challengeOne, 2: day15.challengeTwo });
} else {
  console.log(`Argument '${filter}' not recognised. Only 'latest' is accepted`);
}
