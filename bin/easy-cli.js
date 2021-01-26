#!/usr/bin/env node

'use strict';
const program = require('commander')
const inquirer = require('inquirer')
const questions = require('./lib/question.js')
const init = require('./lib/init.js')

program.version(require('../package.json').version)

program
  .command('init')
  .description('init project')
  .action(async () => {
    const answers = await inquirer.prompt(questions);
    init(answers)
  })

program.parse(process.argv)