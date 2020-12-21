/* eslint-disable no-loop-func */
import { convertInputFileToString } from '../utils.js';
import {
  getAllValidValues,
  rangeToArray,
  validateTicket,
  getRulesAndMatchingIndices,
  getValidTickets,
} from './utils.js';

const input = convertInputFileToString('./challenges/day16/input.txt')
  .split('\n\n')
  .map((row) => row.split('\n'));

const allRules = input[0]
  .map((rule) => rule.split(': '))
  .map(([field, rules]) => [
    field,
    rules
      .split(' or ')
      .reduce(
        (accumulator, ruleRange) => [
          ...accumulator,
          ...rangeToArray(ruleRange),
        ],
        []
      ),
  ]);

const myTicket = input[1][1].split(',').map((value) => +value);
const nearbyTickets = input[2]
  .slice(1)
  .map((ticket) => ticket.split(',').map((value) => +value));

const challengeOne = () => {
  let invalidValues = [];
  const allValidValues = getAllValidValues(input);
  nearbyTickets.forEach((ticket) => {
    invalidValues = [
      ...invalidValues,
      ...validateTicket(ticket, allValidValues),
    ];
  });

  const scanningErrorRate = invalidValues.reduce((accumulator, value) => {
    accumulator += value;
    return accumulator;
  }, 0);

  console.log(`Scanning Error Rate is: ${scanningErrorRate}`);
};

const challengeTwo = () => {
  const validTickets = getValidTickets(input, nearbyTickets);
  let rulesAndTicketIndices = getRulesAndMatchingIndices(
    allRules,
    validTickets,
    myTicket
  );

  const filteredRuleIndices = [];

  // repeats till we just have the original list of rules and their indices left
  while (rulesAndTicketIndices.length > allRules.length) {
    // iterate through indices of a ticket
    for (let i = 0; i < myTicket.length; i++) {
      // first find all rules that have the current index against them
      const rulesWithThisIndex = rulesAndTicketIndices.filter(
        ([, index]) => index === i
      );
      // if we find a rule with nothing else against it, that's the one we want
      if (rulesWithThisIndex.length === 1) {
        // so added it to out filtered list
        filteredRuleIndices.push(rulesWithThisIndex);
        // and filter out all rules that have this index but a different rule name
        rulesAndTicketIndices = rulesAndTicketIndices.filter(
          ([rule, index]) =>
            rule !== rulesWithThisIndex[0][0] ||
            (rule === rulesWithThisIndex[0][0] && index === i)
        );
      }
    }
  }

  const departureSum = rulesAndTicketIndices.reduce(
    (accumulator, [ruleName, index]) => {
      if (ruleName.substr(0, 9) === 'departure') {
        accumulator *= myTicket[index];
      }
      return accumulator;
    },
    1
  );

  console.log(`Departure related field sum: ${departureSum}`);
};

const day16 = {
  challengeOne,
  challengeTwo,
};

export default day16;
