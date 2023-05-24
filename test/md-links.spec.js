const { mdLinks } = require('../index.js');
const path = require("path");
const { existPath } = require("./data.js");
const { absolute } = require("./data.js");
const { identificatorMd } = require("./data.js");
const { readMd } = require("./data.js");
const { getStats } = require("./data.js");


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



describe('readMd', () => {

  it('Muestra el contenido del archivo como string', () => {
    return readMd("prueba/prueba1.md")
      .then((data) => {
        expect(data).toBe('node archivo node.com');
      })
      .catch((error) => {
        throw new Error('El test ha fallado:', error);
    });
  });



});



describe('getStats', () => {
  it('la promesa se resuleve con el stats', () => {
    //const route = 'path/to/your/file.txt';

    return getStats("./test/README.md").then((stats) => {
      expect(stats).toBeInstanceOf(fs.Stats);
      // Add more assertions based on the expected properties of the stats object
    });
  });

  test('should reject with an error for a non-existing file', () => {
    //const route = 'path/to/nonexistent/file.txt';

    return getStats("/noxiste/bu").catch((error) => {
      expect(error).toBeInstanceOf(Error);
      // Add more assertions based on the expected properties or message of the error
    });
  });

  // Add more test cases as needed
});
*/

describe('mdLinks', () => {
  it('deberìa retornar una promesa', () => {
    expect (mdLinks()).toBeInstanceOf(Promise);
  });
  // cuando la ruta exxiste
  it('debería resolver con los enlaces encontrados', () => {
    const mockRoutes = './test/README.md'// simuladas

    // Utiliza 'expect.assertions' para asegurarte de que se resuelva la promesa
    expect.assertions(7);

    // Llama a la función mdLinks y verifica que resuelva con el resultado esperado
    return mdLinks(mockRoutes).then((result) => {
      // Verifica el formato del resultado esperado
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      // aqui esta lo que me
      expect(result[0]).toHaveProperty('href');
      expect(result[1]).toHaveProperty('text');
       expect(result[2]).toHaveProperty('file');
       expect(result[3]).toHaveProperty('file');
       expect(result[4]).toHaveProperty('file');
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