const fs = require('fs');
const path = require('path');

const validateCommand = {

    vNumElements : commandLineArguments => {
        // si el comando proporcionado tiene el número de elementos correcto
        // regresa true
        if (commandLineArguments.length <= 2 || commandLineArguments.length > 5) return false;
        return true;
    },

    pathIsDirOrFile : (pathToCheck, cb) => {
        //TODO: test
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

    findMD : (pathToDir, cb) => {
        fs.readdir(pathToDir, (err, list) => {
            if (err) return cb(err);
            //list = ['file0.ext', 'file1.ext']
            const mdFiles = list.filter(element => {
                return path.extname(element).slice(1) == 'md';
            });
            /* mdFiles.forEach(element => {
                console.log(element);
            }) */
            cb(null, mdFiles);
        })
    },

    mdLinks : (pathToFile, cb) => {
        //FIXME: pathtofile is an array [ 'links.md', 'noLinks.md' ] 
        //TODO: test
        fs.readFile(pathToFile, 'utf8', (err, fileData) => {
            if (err) return cb(err);
            cb(null, fileData);
        })
    }
}

module.exports = validateCommand;