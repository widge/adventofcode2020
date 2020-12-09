const runCommandScript = (commandList) => {
  const cmdTracker = {
    acc: 0,
    finishedCommands: false,
    executedLines: {},
    currentLine: 0,
  };
  while (
    !cmdTracker.finishedCommands &&
    !cmdTracker.executedLines[cmdTracker.currentLine]
  ) {
    if (cmdTracker.currentLine > commandList.length - 1) {
      cmdTracker.finishedCommands = true;
      break;
    }
    const command = commandList[cmdTracker.currentLine];
    cmdTracker.executedLines[cmdTracker.currentLine] = true;

    switch (command.substr(0, 3)) {
      case 'acc':
        cmdTracker.acc += +command.substr(4); // use + to cast as integer
        cmdTracker.currentLine += 1;
        break;
      case 'jmp':
        cmdTracker.currentLine += +command.substr(4);
        break;
      default:
        cmdTracker.currentLine += 1;
        break;
    }
  }

  return cmdTracker;
};

export default runCommandScript;
