import {challengeWrapper} from "./challenges/utils.js";
import {day1} from "./challenges/day1/day1.js";
import {day2} from "./challenges/day2/day2.js";
import {day3} from "./challenges/day3/day3.js";

const args = process.argv.slice(2);
const filter = args && args.length > 0 ? args[0] : "";

if(!filter) {
  challengeWrapper(1, {"1": day1.challengeOne, "1 v2": day1.challengeHashmap, "2": day1.challengeTwo});
  challengeWrapper(2, {"1": day2.challengeOne, "2": day2.challengeTwo});
}

if(!filter || filter === "latest"){
  challengeWrapper(3, {"1": day3.challengeOne, "2": day3.challengeTwo});
}else{
  console.log(`Argument '${filter}' not recognised. Only 'latest' is accepted`);
}