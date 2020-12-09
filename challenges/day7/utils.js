const findParentBags = (input, bag, relevantBags = []) => {
  const parents = input.reduce((accumulator, [key, value]) => {
    if (value.indexOf(bag) > -1) {
      accumulator.push(key.replace('bags', 'bag'));
    }
    return accumulator;
  }, []);

  if (parents.length > 0) {
    parents.forEach((parent) => {
      relevantBags.push(parent);
      findParentBags(input, parent, relevantBags);
    });
  }

  return relevantBags;
};

const buildTreeForChildBags = (input, bag) => {
  const relevantBags = [];
  const childrenList = input.reduce((accumulator, [key, value]) => {
    if (key.indexOf(bag) > -1) {
      accumulator.push(value.replace('.', ''));
    }
    return accumulator;
  }, []);

  if (childrenList.length > 0) {
    childrenList.forEach((childrenString) => {
      if (childrenString !== 'no other bags') {
        const children = childrenString.replace(/bags/g, 'bag').split(', ');
        children.forEach((child) => {
          relevantBags[child] = buildTreeForChildBags(input, child.substr(2));
        });
      }
    });
  }

  return relevantBags;
};

export { findParentBags, buildTreeForChildBags };
