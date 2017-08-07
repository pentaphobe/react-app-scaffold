const path = require('path');
const chalk = require('chalk');

const scappfoldConfigFile = 'scappfold.json';

function warning(message) {
  let extraArgs = Array.prototype.slice
    .call(arguments, 1)
    .map(line => `  ${line}`)
    .join('\n');

  console.log(chalk.yellow.bold(message));
  console.log(chalk.yellow(extraArgs));
}

function recurseUp(dir, testFn) {
  let abs = path.resolve(dir);

  if (abs === '' || abs === '/') {
    return false;
  }
  if (testFn(abs)) {
    return abs;
  }
  return recurseUp(path.dirname(abs), testFn);
}

function getCurrentProject(originPath) {
  let projectPath = recurseUp(path.resolve(originPath), dir =>
    fs.existsSync(path.join(dir, scappfoldConfigFile))
  );

  if (!projectPath) {
    warning(
      `you don't appear to be in a Scappfold project`,
      `directory checked was ${path.resolve(originPath)}`
    );
    return;
  }

  // console.log(chalk.green(`project found at ${path.resolve(projectPath)}...`));
  return projectPath;
}

function isValidProject(path) {
  return typeof getCurrentProject(path) !== 'undefined';
}

module.exports = {
  isValidProject,
  recurseUp,
  getCurrentProject,
  warning
};