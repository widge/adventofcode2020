const rangeToArray = (rangeString) => {
  const rangeArray = [];
  const [min, max] = rangeString.split('-');
  for (let i = +min; i <= +max; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
};

const getAllValidValues = (input) =>
  input[0]
    .map((rule) => rule.split(': '))
    .map(([, rules]) =>
      rules
        .split(' or ')
        .reduce(
          (accumulator, rule) => [...accumulator, ...rangeToArray(rule)],
          []
        )
    )
    .reduce((accumulator, ruleList) => [...accumulator, ...ruleList], []);

const validateTicket = (ticket, allValidValues) =>
  ticket.filter((value) => allValidValues.indexOf(value) < 0);

const getValidTickets = (input, nearbyTickets) => {
  const allValidValues = getAllValidValues(input);

  // get only valid tickets
  const validTickets = nearbyTickets.filter(
    (ticket) => validateTicket(ticket, allValidValues).length === 0
  );

  return validTickets;
};

const getRulesAndMatchingIndices = (rules, validTickets, myTicket) => {
  const rulesAndTicketIndices = [];
  // find out what ticket fields match each rule and add to a list
  for (let i = 0; i < myTicket.length; i++) {
    rules.forEach(([ruleName, ruleValues]) => {
      const isValid = validTickets.every(
        (ticket) => ruleValues.indexOf(ticket[i]) > -1
      );
      if (isValid) {
        rulesAndTicketIndices.push([ruleName, i]);
      }
    });
  }
  return rulesAndTicketIndices;
};

export {
  getAllValidValues,
  validateTicket,
  getRulesAndMatchingIndices,
  rangeToArray,
  getValidTickets,
};
