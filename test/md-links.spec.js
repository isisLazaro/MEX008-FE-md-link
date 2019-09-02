const validateCommand = require('../app.js');

const command0 = ["nodePath", "jsPath"]; //false
const command1 = ["nodePath", "jsPath", "filePath"]; //true
const command2 = ["nodePath", "jsPath", "filePath" , "--flag1"];//true
const command3 = ["nodePath", "jsPath", "filePath" , "--flag1", "flag2"];//true
const command4 = ["nodePath", "jsPath", "filePath" , "--flag1", "flag2", "otro"];//false

describe('vNumElements', () => {
  it('is a function', () =>{
    expect(typeof validateCommand.vNumElements).toBe('function');
  });
  it('Debería regresar true si el comando tiene el número correcto de elementos', () => {
    expect(validateCommand.vNumElements(command1)).toEqual(true);
  });
  //TODO: faltan dos casos falsos
});

describe('vIsDir', () => {
  it('is a function', () => {
    expect(typeof validateCommand.vIsDir).toBe('function')
  });
  it("Debería regresar false si no es un archivo", () => {
    expect(validateCommand.vIsDir('c:/')).toEqual(false);
  });
});