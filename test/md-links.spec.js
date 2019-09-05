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
    expect(validateCommand.vNumElements(command1)).toBeTruthy();
  });
  it('Debería regresar false si el comando no se escribe con argumentos y flags', () => {
    expect(validateCommand.vNumElements(command0)).toBeFalsy();
  });
  it('Debería regresar false si el comando se escribe con más elementos de los necesarios', () => {
    expect(validateCommand.vNumElements(command4)).toBeFalsy();
  })
});

describe('vIsDir', () => {
  it('is a function', () => {
    expect(typeof validateCommand.vIsDir).toBe('function')
  });
  it("Debería regresar false si no es un archivo", () => {
    expect(validateCommand.vIsDir('c:/')).toEqual(false);
  });
});

describe('findMD', () => {
  // FIXME: CAMBIAR A UNA RUTA RELATIVA (?)
  it('is a function', () => {
    expect(typeof validateCommand.findMD).toBe('function')
  });
  test('Encuentra archivos *.md', done => {
    validateCommand.findMD('C:/Users/isis7/io/testMD', (err, mdfiles) => {
     // expect(err).toBeTruthy();
      expect(mdfiles).toEqual([ 'links.md', 'noLinks.md' ]);
      done();
    })
  })
  test('falla cuando no hay archivos *.md en el directorio', done => {
    validateCommand.findMD('C:/Users/isis7/io/test', (err, mdfiles) => {
      expect(err).toBeTruthy();
      done();
    })
  })
});