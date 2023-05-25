const { mdLinks } = require('../index.js');
const path = require("path");
const { existPath } = require("./data.js");
const { absolute } = require("./data.js");
const { identificatorMd } = require("./data.js");
const { readMd } = require("./data.js");
const { getStats } = require("./data.js");
const { processEnsayo } = require('./data.js');




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

it('existPath', () => {

  it('Indica si la ruta no exite devolviendo un boleeano: false', () => {
    expect(existPath('/rutaInexistente.md')).toBe(false);
  });
  it('Indica si la ruta existe un boleeano: true', () => {
    expect(existPath('./test/README.md')).toBe(true);
  });

});

describe('identificatorMd', () => {

  it('Devuelve los archivos con extensiòn md', () => {
    expect(identificatorMd("readme.md")).toBe(true);
  });
  it('Devuelve false cuando el archivo no tiene extensiòn md', () => {
    expect(identificatorMd("index.js")).toBe(false);
  });

});



describe('readMd', () => {

  it('Muestra el contenido del archivo como string', () => {
    //file =
     readMd( "prueba/prueba2.md")
    
      .then((data) => {
        expect(data).toBe('node archivo node.com', data);
      })
      .catch((error) => {
        console.error('Error en la prueba:', error);
    });
  });



});



/*
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
  it('retorna una promesa', () => {
    expect (mdLinks()).toBeInstanceOf(Promise);
  });
  // cuando la ruta exxiste
  it.only('resuelve con los enlaces encontrados', (done) => {
    const mockRoutes = './test/README.md'// simuladas
         
    // Llama a la función mdLinks y verifica que resuelva con el resultado esperado
    mdLinks(mockRoutes).then((result) => {
      // Verifica el formato del resultado esperado
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      setTimeout(() => {
        // aquí están las aserciones
        expect(result[0]).toHaveProperty('href');
        expect(result[1]).toHaveProperty('text');
        expect(result[2]).toHaveProperty('ok');
        expect(result[3]).toHaveProperty('status');
        expect(result[4]).toHaveProperty('file');
      });
      done() // Aumenta el tiempo de espera a 10 segundos (10000 ms)
    });
  });
});
  
  
  
  
  
  



describe('processEnsayo', () => {
  it('Devuelve un objeto con los enlaces encontrados', () => {
    const data = `
    [aquí](http://rmarkdown.rstudio.com/)
    [video](https://www.youtube.com/watch?v=vQ_EBqgUR0c&ab_channel=Luucamay/)`;

    const route = 'prueba/prueba1.md';

    const result = processEnsayo(data, route);

    expect(result).toEqual({
      links: [
        { href: 'http://rmarkdown.rstudio.com/', text: 'aquí', file: 'prueba/prueba1.md' },
        { href: 'https://www.youtube.com/watch?v=vQ_EBqgUR0c&ab_channel=Luucamay/', text: 'video', file:  'prueba/prueba1.md' }
      ]
    });
  });
  it('debería devolver un objeto vacío si no se encuentran enlaces', () => {
    const data = 'este arhcivo no tiene enlaces';
    const route = 'prueba/prueba3.md';

    const result = processEnsayo(data, route);

    expect(result).toEqual({
      links: []
    });
  });
});
describe('checkLink', () => {
  test('debería devolver un array de promesas con los resultados de las peticiones', async () => {
    const result = {
      links: [
        { href: 'https://www.enlace1.com', text: 'enlace1', file: '/path/to/file.md' },
        { href: 'https://www.enlace2.com', text: 'enlace2', file: '/path/to/file.md' }
      ]
    };

    const url = 'https://www.example.com';
    const text = 'ejemplo';
    const file = '/path/to/file.md';

    // Mock de axios para simular la respuesta exitosa
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, statusText: 'OK' });

    const promisesArray = checkLink(result, url, text, file);
    const response = await Promise.all(promisesArray);

    expect(response).toEqual([
      {
        href: 'https://www.example.com',
        file: '/path/to/file.md',
        text: 'ejemplo',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://www.example.com',
        file: '/path/to/file.md',
        text: 'ejemplo',
        status: 200,
        ok: 'OK'
      }
    ]);
  });

  
});






/*

describe('mdLinks', () => {

  it('deberìa devolver una promesa', () => {
    expect (typeof mdLinks).toBe('promise');
  });

});
*/