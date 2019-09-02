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
    //TODO: asegurar que es una rua
    //TODO: archivo o directorio
    vIsDir : filePath => {
        fs = require('fs');
        return fs.statSync(filePath).isFile();
    }
}

module.exports = validateCommand;