const path = require('path');
const pkg = require('../package.json');

const chalk = require('chalk');
const program = require('commander');

const fs = require('./fs');
const { cwdRelative, cwdPath, scriptRelative, scriptPath } = require('./paths');
const { isDryRun, setDryRun } = require('./dryRun');

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

///////// Global configuration and options
program
  .version(pkg.version)
  .option('-d, --dry-run', `don't modify filesystem in any way`)
  .on('option:dry-run', function() {
    setDryRun(true);
  });

///////// Commands

program
  .command('create-project <projectName>')
  .option('-t, --template <templateName>', 'override default template')
  .description('scaffold a new project called <projectName>')
  .action((projectName, program) => {
    let projectPath = cwdPath(projectName);
    if (fs.existsSync(projectPath)) {
      console.log(
        `folder ${path.resolve(cwdPath(projectName))} exists, exitting`
      );
      process.exit(-1);
    }
    console.log(program);
    try {
      console.log(
        chalk.white(`making project path ${chalk.bold(projectPath)}...`)
      );
      fs.mkdirSync(projectPath);

      console.log(
        chalk.green(
          `creating application ${chalk.bold(cwdRelative(projectName))}...`
        )
      );

      if (!isDryRun()) {
        // some logic can't be magically handled by our dryRun fs wrapper...
        if (!fs.isDirectory(projectPath)) {
          console.log(chalk.red(`node ${projectPath} is not a directory`));
          process.exit(-1);
        }
      }

      let templateName = program.template ? '-' + program.template : '';
      let templatePath = scriptPath(
        `./node_modules/react-app-scaffold-template${templateName.toLowerCase()}`
      );

      console.log(`template name: ${templateName}`);
      console.log(`using template ${templatePath}...`);

      const recursiveReadSync = require('recursive-readdir-sync');
      const ProgressBar = require('progress');
      const copy = require('recursive-copy');
      let fileList = recursiveReadSync(templatePath);

      var bar = new ProgressBar(
        `${chalk.cyan(
          'copying template files'
        )} [:bar] :percent :current / :total`,
        { total: fileList.length }
      );

      if (isDryRun()) {
        // fake copying
        var timer = setInterval(function() {
          bar.tick();
          if (bar.complete) {
            console.log(chalk.green('complete\n'));
            clearInterval(timer);
          }
        }, 10);
      } else {
        const nameMap = {
          'package.json': 'pickige.json',
        };

        const options = {
          overwrite: false,
          expand: true, // expand symbolic links
          dot: true,
          rename: function(inName) {
            if (inName in nameMap) {
              return nameMap[inName];
            }
            return inName;
          },
        };

        // do actual copying
        copy(templatePath, projectPath, options)
          .on(copy.events.COPY_FILE_COMPLETE, function(copyOp) {
            console.log(copyOp.dest);
            bar.tick();
          })
          .on(copy.events.ERROR, function(err, copyOp) {
            console.error('Unable to copy ' + copyOp.dest);
          })
          .then(function(results) {
            console.log(chalk.green('complete\n'));
          })
          .catch(function(err) {
            return console.error('Copy failed: ' + error);
          });
      }
    } catch (e) {
      console.log(
        chalk.red.bold(
          `an error occurred (see below), likely a permission issue`
        )
      );
      console.log(chalk.red(e));
    }
  });

program
  .command('create-component <ComponentName>')
  .option('-t, --template <templateName>', 'override default template')
  .description(
    'scaffold a new component called <ComponentName> in the current project'
  )
  .action((componentName, program) => {
    if (fs.existsSync(cwdPath(componentName))) {
      console.log(
        `folder ${path.resolve(cwdPath(componentName))} exists, exitting`
      );
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
    console.log(chalk.cyan.bold.underline(`Project:`));
    console.log(chalk.cyan(`  ${projectPath}`));
    ['name', 'description'].forEach(key =>
      console.log(chalk.yellow.bold(`  ${key}: ${chalk.dim(projectInfo[key])}`))
    );
    console.log(
      chalk.green(
        `\ncreating component ${chalk.bold(
          cwdRelative(componentPath)
        )} from template '${chalk.bold(templateName)}'...`
      )
    );
  });

///////// Entry point
program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
