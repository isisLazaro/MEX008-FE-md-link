#!/usr/bin/env node

/* require('../')()

module.exports = () => {
  console.log('Welcome to the outside!')
}; */

const path = require('path');

const chalk = require('chalk');

const validateCommand = require('./app.js');


if (validateCommand.checkNumInputElements(process.argv)) {
  [pathProcessExe, pahtJsExe, ...args] = process.argv;
}
else {
  console.log(`${chalk.red.inverse('ERROR')}\nUsage must be:\nmd-links path-to-file\nmd-links path-to-file --stats \nmd-links path-to-file --validate \nmd-links path-to-file --stats --validate`);
  process.exit(-1);
  //TODO: cambiar estilo de sugerencias
}

console.log(validateCommand.checkInputFormat(args));

validateCommand.pathIsDirOrFile(args[0], (err, result) => {
  if (err) return console.error(`${chalk.red.inverse('ERROR')} no path to ${args[0]}`);
  const pathTo = validateCommand.pathAbs(args[0]);
  // > a partir de aquí se manejan rutas absolutas ↴
  if (result == 'f') { //is a file
    if (!validateCommand.isMD(pathTo)) 
      return console.error(`${path.basename(pathTo)} is not a md file`);
    else{
      validateCommand.findLinks(pathTo, (err, links) => {
        if (err) return console.error(err);
        if (links.length == 0) return console.log(`no se encontraron links en el archivo ${path.basename(pathTo)}`)
        links.forEach(element => {
          console.log(`${args[0]}    ${element}`);
        })
        //console.log(args[0], links);
        //TODO: formato que pide a la salida
      })
    }
  }
  else if (result == 'd') { //is a directory
    validateCommand.hasMD(pathTo, (err, list) => {
      if (err) return console.error(err);
      //console.log(list);
      if (list.length == 0) return console.error(`${path.basename(pathTo)} doesn't have md files`);
      else {
        //TODO: search links
        list.forEach(element => {
          validateCommand.findLinks(path.join(pathTo, element), (err, links) => {
            if (err) return console.error(err);
            links.forEach(link => {
              console.log(`${args[0]}${element}    ${link}`)
            })
          })
        });
      }
    })
  }
})

/* validateCommand.hasMD(args[0], (err, mdFiles) => {
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
}); */

/* TODO:
  Comprobar que se escribió 1 argumento
  TODO: Comprobar que es una ruta
  TODO: Comprobar si es una ruta absoluta
  TODO: Si es relativa, resolver? cambiar absoluta? 
  commander, minimist*/