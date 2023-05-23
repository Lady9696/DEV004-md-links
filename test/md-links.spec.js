//const mdLinks = require('./data.js');
const path = require("path");
const { existPath } = require("./data.js");
const { absolute } = require("./data.js");
const { identificatorMd } = require("./data.js");
const { readMd } = require("./data.js");

/*

describe('absolute', () => {

  test('cuando una ruta es relativa, me devuelve uan ruta', () => {
    const file = 'readme.md';
    const expected = path.resolve(file);
    
    const result = absolute(file);
    
    expect(result).toBe(expected);
  });
 

  it('si entrego una ruta absoluta, me devuelve la misma ruta', () => {
    expect(absolute('C:/Users/Lady/OneDrive/Escritorio/laboratoria/DEV004-md-links/test/README.md')).toBe('C:/Users/Lady/OneDrive/Escritorio/laboratoria/DEV004-md-links/test/README.md');
  });

});

describe('existPath', () => {

  it('Indica si la ruta no exite devolviendo un boleeano: false', () => {
    expect(existPath('/rutaInexistente.md')).toBe(false);
  });
  it('Indica si la ruta existe un boleeano: true', () => {
    expect(existPath('./test/README.md')).toBe(true);
  });

});

describe('identificatorMd', () => {

  it('Devuelve los archivos con extensiòn md', () => {
    expect(identificatorMd("readme.md")).toBe("readme.md");
  });
  it('Devuelve false cuando el archivo no tiene extensiòn md', () => {
    expect(identificatorMd("index.js")).toBe(false);
  });

});
*/
describe('readMd', () => {

  it('Muestra el contenido del archivo como string', () => {
    return readMd("prueba/prueba1.md")
      .then((data) => {
        expect(data.trim()).toBe('node archivo node.com');
      })
      .catch((error) => {
        throw new Error('El test ha fallado:', error);
      });

  });





});


/*
describe('mdLinks', () => {

  it('deberìa devolver una promesa', () => {
    expect (typeof mdLinks).toBe('promise');
  });

});
*/