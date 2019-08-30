#!/usr/bin/env node

/* require('../')()

module.exports = () => {
  console.log('Welcome to the outside!')
}; */
//console.log(process.argv);

const path = require('path');
const chalk = require('chalk');

if (process.argv.length <= 2 || process.argv.length > 5) {
  console.log(`${chalk.red.inverse('ERROR')}\nUsage must be:\nmd-links path-to-file\nmd-links path-to-file --stats \nmd-links path-to-file --validate \nmd-links path-to-file --stats --validate`);
  process.exit(-1);
}
[pathProcessExe, pahtJsExe, ...args] = process.argv;
console.log(args);
//console.log(path.basename(args[0]));

/* TODO:
  Comprobar que se escribió 1 argumento
  TODO: Comprobar que es una ruta
  TODO: Comprobar si es una ruta absoluta
  TODO: Si es relativa, resolver? cambiar absoluta? 
  commander, minimist*/