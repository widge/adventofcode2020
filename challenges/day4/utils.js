const breakTag = "|break|";
const requiredFields = [ 'byr','iyr','eyr','hgt','hcl','ecl','pid'];

// Long story short - convert input file to a clean array of objects representing each passport
const normaliseInput = (input) => {

  return input.replace(/\n\n/g,breakTag)
    .replace(/\n|\s/g,",")
    .split(breakTag)
    .map((data) => data
    .split(",")
    .map((attribute) => attribute.split(':'))
    .reduce((accumulator, attrArray) => {
      accumulator[attrArray[0]] = attrArray[1];
      return accumulator;
    }, {}));
}
const allRequiredFieldsPresent = (passport) => {

  const leftOverFields = requiredFields
    .filter((fieldName) => Object.keys(passport).indexOf(fieldName) < 0);
  return leftOverFields.length == 0
}

const isBetween = (value, min, max) => {
  return value >= min && value <= max;
}

const validators = {
  'byr':(val) => val.length === 4 && isBetween(val, 1920, 2002),
  'iyr':(val) => val.length === 4 && isBetween(val, 2010, 2020),
  'eyr':(val) => val.length === 4 && isBetween(val, 2020,2030),
  'hgt':(val) => {
    if(!val){return false;}
    switch(val.substr(-2)){
      case "in":
        return isBetween(val.substr(0, val.length-2), 59, 76)
        break;
      case "cm":
        return isBetween(val.substr(0, val.length-2), 150, 193)
        break;
      default:
        return false;
    }
  },
  'hcl': (val) => !!val.match(/^[\#][a-f0-9]{6}$/g),
  'ecl': (val) => ['amb','blu','brn','gry','grn','hzl','oth'].indexOf(val) > -1,
  'pid': (val) => !!val.match(/^[0-9]{9}$/g),
  'cid': () => true
};

export { allRequiredFieldsPresent, normaliseInput, validators }