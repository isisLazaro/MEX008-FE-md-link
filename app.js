const fs = require('fs');
const path = require('path');

const validateCommand = {

    vNumElements : commandLineArguments => {
        // si el comando proporcionado tiene el número de elementos correcto
        // regresa true
        if (commandLineArguments.length <= 2 || commandLineArguments.length > 5) {
            return false;
        }
        return true;
    },

    //TODO:
    //TODO: asegurar que es una ruta
    //TODO: archivo o directorio
    vIsDir : filePath => {
        return fs.statSync(filePath).isFile();
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