#!/usr/bin/env node

/* require('../')()

module.exports = () => {
  console.log('Welcome to the outside!')
}; */

const chalk = require('chalk');

const validateCommand = require('./app.js');


if (validateCommand.vNumElements(process.argv)) {
  [pathProcessExe, pahtJsExe, ...args] = process.argv;
}
else {
  console.log(`${chalk.red.inverse('ERROR')}\nUsage must be:\nmd-links path-to-file\nmd-links path-to-file --stats \nmd-links path-to-file --validate \nmd-links path-to-file --stats --validate`);
  process.exit(-1);
  //TODO: cambiar estilo sugerencias
}

//console.log(fs.statSync(args[0]).isFile());
//console.log(validateCommand.vIsDir(args[0]));
//console.log(path.basename(args[0]));

const a =  validateCommand.findMD(args[0], (err, mdFiles) =>{
  if (err) return err;
  //console.log(mdFiles[0]);
  //return mdFiles;
  validateCommand.mdLinks('C:/Users/isis7/io/testMD/links.md', (err, fileData) => {
    //FIXME: pasar el argumento correcto
    if (err) return console.error(err);
    const myRe = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.,~#?!&//=]*)?/gi;
    const links = fileData.match(myRe);
    console.log(links.length);
  });
});

/* TODO:
  Comprobar que se escribió 1 argumento
  TODO: Comprobar que es una ruta
  TODO: Comprobar si es una ruta absoluta
  TODO: Si es relativa, resolver? cambiar absoluta? 
  commander, minimist*/