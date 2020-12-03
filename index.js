import {challengeWrapper} from "./challenges/utils.js";
import {day1} from "./challenges/day1/day1.js";
import {day2} from "./challenges/day2/day2.js";


challengeWrapper(1, {"1": day1.challengeOne, "1 v2":day1.challengeHashmap, "2":day1.challengeTwo});

challengeWrapper(2, {"1": day2.challengeOne, "2":day2.challengeTwo});
