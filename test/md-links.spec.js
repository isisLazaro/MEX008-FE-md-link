const validateCommand = require('../app.js');

const command0 = ["nodePath", "jsPath"]; // no valid
const command1 = ["nodePath", "jsPath", "C:/", "--flag1", "flag2", "otro"]; // no valid
//FIXME: cambiar las rutas y los nombres
const command2 = ["nodePath", "jsPath", "C:/"];
const command3 = ["nodePath", "jsPath", "test" , "--flag1"]; // ./test
const command5 = ["nodePath", "jsPath", "index.js" , "--flag1", "flag2"];// ./index.js
const command6 = ["nodePath", "jsPath", "tests/md-links.spec.js" , "--flag1"]; // esta ruta no existe
const command7 = ["nodePath", "jsPath", "READMEoriginal.md" , "--flag1", "flag2"];// ./index.js

const path = require('path');

describe('checkNumInputElements', () => {
  it('is a function', () => {
    expect(typeof validateCommand.checkNumInputElements).toBe('function');
  });
  it('Debería regresar true si el comando tiene el número correcto de elementos', () => {
    expect(validateCommand.checkNumInputElements(command2)).toBeTruthy();
  });
  it('Debería regresar false si el comando no se escribe con argumentos y flags', () => {
    expect(validateCommand.checkNumInputElements(command0)).toBeFalsy();
  });
  it('Debería regresar false si el comando se escribe con más elementos de los necesarios', () => {
    expect(validateCommand.checkNumInputElements(command1)).toBeFalsy();
  })
});

describe('pathIsDirOrFile', () => {
  it('is a function', () => {
    expect(typeof validateCommand.pathIsDirOrFile).toBe('function');
  });
  test(`Debería regresar 'd' si es un directorio`, done => {
    validateCommand.pathIsDirOrFile(command2[2], (err, result) => {
      expect(result).toEqual('d');  
      done(); 
    }) 
  });
  test(`Debería regresar 'f' si es un archivo`, done => {
    validateCommand.pathIsDirOrFile(command5[2], (err, result) => {
      expect(result).toEqual('f');  
      done(); 
    }) 
  });
  test(`Falla cuando la ruta no existe`, done => {
    validateCommand.pathIsDirOrFile(command6[2], (err, result) => {
      expect(err).toBeTruthy();  
      done(); 
    }) 
  });
});

describe('pathAbs', () => {
  it('is a function', () => {
    expect(typeof validateCommand.pathAbs).toBe('function');
  });
  test('Si la ruta es absoluta, regresa la misma ruta', () => {
    expect(validateCommand.pathAbs(command2[2])).toEqual(command2[2])
  });
  test('Si la ruta es relativa, la regresa como absoluta', () => {
    expect(validateCommand.pathAbs(command5[2])).toEqual(path.resolve(command5[2]))
  });
});

describe('isMD', () => {
  it('is a function', () => {
    expect(typeof validateCommand.isMD).toBe('function');
  });
  test('Si la ruta corresponde a un archivo *.md regresa true', () => {
    expect(validateCommand.isMD(path.resolve(command7[2]))).toBeTruthy();
  });
  test('Si la ruta no corresponde a un archivo *.md regresa false', () => {
    expect(validateCommand.isMD(path.resolve(command5[2]))).toBeFalsy();
  });
});

describe('hasMD', () => {
  it('is a function', () => {
    expect(typeof validateCommand.hasMD).toBe('function');
  });
  test('Si el directorio tiene archivos *.md, regresa un array de longitud > 0', done => {
    validateCommand.hasMD(path.resolve('./'), (err, mdFiles) => {
      expect(mdFiles.length).toBeGreaterThan(0);
      done();
    })
  });
  test('Si el directorio no tiene archivos *.md, regresa un array de longitud cero', done => {
    validateCommand.hasMD(path.resolve('node_modules'), (err, mdFiles) => {
      expect(mdFiles).toHaveLength(0);
      done();
    })
  });
  test('falla cuando no existe el directorio', done => {
    validateCommand.hasMD(path.resolve('node-modules'), (err, mdFiles) => {
      expect(err).toBeTruthy();
      done();
    })
  })
}); 

describe('findLinks', () => {
  //TODO: validar links
  it('is a function', () => {
    expect(typeof validateCommand.findLinks).toBe('function');
  });
  test('Cuando el archivo tiene links, regresa un array de longitud mayor que cero', done => {
    validateCommand.findLinks(path.resolve('READMEoriginal.md'), (err, links) => {
      expect(links.length).toBeGreaterThan(0);
      done();
    })
  })
  test('Cuando el archivo no tiene links, regresa un array de longitud cero', done => {
    validateCommand.findLinks(path.resolve('README.md'), (err, links) => {
      expect(links).toHaveLength(0);
      done();
    })
  })
  test('falla cuando no existe el archivo', done => {
    validateCommand.findLinks('READMEx.md', (err, links) => {
      expect(err).toBeTruthy();
      done();
    })
  })
})


/* describe('findMD', () => {
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
}); */