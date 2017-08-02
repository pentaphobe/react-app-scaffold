const path = require('path');
const pkg = require('../package.json');

const chalk = require('chalk');
const program = require('commander');

const fs = require('./fs');
const { cwdRelative, cwdPath, scriptPath } = require('./paths');
const { isDryRun, setDryRun } = require('./dryRun');

const scappfoldConfigFile = 'scappfold.json';

function warning(message) {
  let extraArgs = Array.prototype.slice.call(arguments, 1)
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
  let projectPath = recurseUp(path.resolve(originPath), (dir) => fs.existsSync(path.join(dir, scappfoldConfigFile)));

  if (!projectPath) {
    warning(`you don't appear to be in a Scappfold project`, `directory checked was ${path.resolve(originPath)}`);
    return;
  }
  
  // console.log(chalk.green(`project found at ${path.resolve(projectPath)}...`));
  return projectPath;
}

///////// Global configuration and options
program
  .version(pkg.version)
  .option('-d, --dry-run', `don't modify filesystem in any way`)
  .on('option:dry-run', function () {
    setDryRun(true);
  })

///////// Commands
program
  .command('create-project <projectName>')
  .option('-t, --template <templateName>', 'override default template')
  .description('scaffold a new project called <projectName>')
  .action((projectName, program) => {
    if (fs.existsSync(cwdPath(projectName))) {
      console.log(`folder ${path.resolve(cwdPath(projectName))} exists, exitting`);
      process.exit(-1);
    }

    console.log(chalk.green(`creating application ${chalk.bold(cwdRelative(projectName))}`));
  });

program
  .command('create-component <ComponentName>')
  .option('-t, --template <templateName>', 'override default template')
  .description('scaffold a new component called <ComponentName> in the current project')
  .action((componentName, program) => {
    if (fs.existsSync(cwdPath(componentName))) {
      console.log(`folder ${path.resolve(cwdPath(componentName))} exists, exitting`);
      process.exit(-1);
    }

    let projectPath = getCurrentProject(process.cwd());
    let projectInfo = {};
    let componentPath;
    let templateName = program.template || 'default';

    if (!projectPath) {
      process.exit(-1);
    }

    projectInfo = require(path.join(projectPath, scappfoldConfigFile));
    componentPath = path.join(projectPath, 'packages', componentName);
    console.log(chalk.cyan.bold.underline(`Project:`))
    console.log(chalk.cyan(`  ${projectPath}`));
    ['name', 'description'].forEach( key => console.log(chalk.yellow.bold(`  ${key}: ${chalk.dim(projectInfo[key])}`)));
    console.log(chalk.green(`\ncreating component ${chalk.bold(cwdRelative(componentPath))} from template '${chalk.bold(templateName)}'...`));
  });  

///////// Entry point
program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}