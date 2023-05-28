const { mdLinks } = require('../index.js');
const path = require("path");
const { existPath } = require("./data.js");
const { absolute } = require("./data.js");
const { identificatorMd } = require("./data.js");
const { readMd } = require("./data.js");
//const { getStats } = require("./data.js");
const { processEnsayo } = require('./data.js');




describe('absolute', () => {

  it('cuando una ruta es relativa, me devuelve uan ruta', () => {
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
  it('Indica si la ruta no existe devolviendo un booleano: false', () => {
    expect(existPath('/rutaInexistente.md')).toBe(false);
  });
});

describe('existPath', () => {
  it('Indica si la ruta existe devolviendo un booleano: true', () => {
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


describe('mdLinks', () => {
  it('retorna una promesa', () => {
    expect (mdLinks()).toBeInstanceOf(Promise);
  });
  // cuando la ruta exxiste
  it('resuelve con los enlaces encontrados', (done) => {
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
        done()
      },1000);
      // Aumenta el tiempo de espera a 7 segundos (10000 ms)
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

    expect(result).toEqual
    [{"file": "prueba/prueba1.md", "href": "http://rmarkdown.rstudio.com/", "text": "aquí"}, 
    {"file": "prueba/prueba1.md", "href": "https://www.youtube.com/watch?v=vQ_EBqgUR0c&ab_channel=Luucamay/",
     "text": "video"}]
    
  });
  
});






