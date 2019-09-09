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

if(args.length > 1 && !validateCommand.checkInputFormat(args)) {
  console.log(`${chalk.red.inverse('ERROR')}\nUsage must be:\nmd-links path-to-file\nmd-links path-to-file --stats \nmd-links path-to-file --validate \nmd-links path-to-file --stats --validate`);
  process.exit(-1);
  //TODO: cambiar estilo de sugerencias
}

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
        if (args.indexOf('--validate') != -1) validateCommand.checkLinkStatus(links);
      })
    }
  }
  else if (result == 'd') { //is a directory
    validateCommand.hasMD(pathTo, (err, list) => {
      if (err) return console.error(err);
      //console.log(list);
      if (list.length == 0) return console.error(`${pathTo} doesn't have md files`);
      else {
        //TODO: search links
        list.forEach(element => {
          validateCommand.findLinks(path.join(pathTo, element), (err, links) => {
            if (err) return console.error(err);
            if (links.length == 0) return console.log(`no se encontraron links en el archivo ${element} `)
            links.forEach(link => {
              console.log(`${args[0]}${element}    ${link}`)
            })
          })
        });
      }
    })
  }
})

/* const req = require('https').get('https://mexico.as.com/404', res => {
  console.log(`statusCode: ${res.statusCode}`);
}).on('error', (e) => {
  console.error(e);
}); */
//TODO: function print
//commander, minimist