"use strict";

const fs = require('fs');
const path = require('path');

const validateCommand = {

    checkNumInputElements : cliArguments => {
        // si el comando proporcionado tiene el número de elementos correcto
        // regresa true
        if (cliArguments.length <= 2 || cliArguments.length > 5) return false;
        return true;
    },

    checkInputFormat : args => {
        //TODO: test
        // args - array con los elementos proporcionados por el usuario
        if (args.length == 2 && (args[1] == '--validate' || args[1] == '--stats')) return true
        else if(args.length == 3 && (args.indexOf('--validate') != -1 && args.indexOf('--stats') != -1)) return true
        else return false
    },

    pathIsDirOrFile : (pathToCheck, cb) => {
        // determina si la ruta proporcionada es de un directorio o un archivo
        fs.stat(pathToCheck, (err, stats) => {
            if (err) return cb(err); //error o incorrect path
            let pathIs = '';
            if (stats.isDirectory()) pathIs = 'd'; // path is a directory
            else {
                if (stats.isFile()) pathIs = 'f'; // path is a file
            }
            cb(null, pathIs);
        })
        //return fs.statSync(filePath).isFile();
    },

    pathAbs : pathToCheck => {
        // si la ruta es relativa, la regresa como ruta absoluta
        const newPath = '';
        if (path.isAbsolute(pathToCheck)) return pathToCheck; //return true
        else return path.resolve(pathToCheck);//return false
    },

    isMD : pathToFile => {
        //return true if is a md file
        return path.extname(pathToFile).slice(1) == 'md';
    },

    hasMD : (pathToDir, cb) => {
        // TODO: test
        // busca los archivos *.md en un directorio
        // si el directorio tiene archivos md regresa un array con el nombre de los archivos
        // si no, regresa un array vacío
        // FIXME:? no busca en sub-carpetas
        fs.readdir(pathToDir, (err, files) => {
            if (err) return cb(err);
            //files = ['file0.ext', 'file1.ext', ...]
            const mdFiles = files.filter(element => {
                //return path.extname(element).slice(1) == 'md';
                return validateCommand.isMD(element);
            });
            /* mdFiles.forEach(element => {
                console.log(element);
            }) */
            cb(null, mdFiles);
        })
    },

    findLinks : (pathToFile, cb) => {
        //TODO: test: si son rutas?
        //TODO: paréntesis
        fs.readFile(pathToFile, 'utf8', (err, fileData) => {
            if (err) return cb(err);
            const reURL = /https?:\/\/?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.,~#?!&//=]*)?/gi;
            //const reURL = /https?:\/\/?[-a-zA-Z0-9@:%_\+~#=]{1,256}/gi;
            let links = fileData.match(reURL);
            if (links === null) links = [];
            cb(null, links);
        })
    }
}

module.exports = validateCommand;