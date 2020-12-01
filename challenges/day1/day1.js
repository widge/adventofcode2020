import input from './input.js';

const list = input.data;
const target = 2020;

const challengeOne = () => {
  console.log("# Challenge 1 #");

  // .some stops iterating when true is returned
  list.some((value1) => {

    return list.some((value2) => {

      if(value1 + value2 === target){
        console.log(`It's ${value1} & ${value2}`);
        console.log(`Result: ${value1*value2}`);
        return true;
      }

      return false;
    });
  })
}

const challengeHashmap = () => {
  console.log("# Challenge 1 v2 #");
  const hash = {};
  list.some((value1, index) => {

    hash[value1] = index;
    const difference = target - value1;

    // see if 'difference' is a value in the hashmap already
    if(hash[difference]){
      console.log(`It's ${list[hash[difference]]} & ${value1}`);
      console.log(`Result: ${difference*value1}`);
      return true;
    }
    return false;
  });
}

const challengeTwo = () => {
  console.log("# Challenge 2 #");

  const hash = {};
  list.some((value1, index) => {
    hash[value1] = index;

    return list.some((value2) => {
      const difference = target - value1 - value2;

      //see if 'difference' is a key in the hashmap already
      if(hash[difference]){
        console.log(`It's ${list[hash[difference]]} & ${value1} & ${value2}`);
        console.log(`Result: ${difference*value1*value2}`);
        return true;
      }

      return false;
      });
  });
};

const day1 = {
  challengeOne,
  challengeHashmap,
  challengeTwo
}

export { day1 };
