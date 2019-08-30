const validateCommand = {
    vNumElements : commandLineArguments => {
        // si el comando proporcionado tiene el número de elementos correcto
        // regresa true
        if (commandLineArguments.length <= 2 || commandLineArguments.length > 5) {
            return false;
        }
        return true;
        }
}

module.exports = validateCommand;