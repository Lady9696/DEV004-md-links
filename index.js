// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const { identificator } = require('./test/data');
const { existPath, absolute } = require('./test/data');

const { fs, path, access, constants } = require('./test/data.js');
1// se crea una funciòn que tiene routes y options como paàmetro, lo que me retorna una promesa
//con dos valores   que son resolve y reject.
const mdLinks = (routes, options) => {
  return new Promise((resolve, reject) => {

    // se verifica si la ruta existe
    if (existPath(routes)) {
      console.log('existe la ruta');
      // si la ruta es relativa, se vuelve absoluta
      const routeAbsolute = absolute(routes);
      console.log(routeAbsolute);
     
      fs.stat(routes, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          
        } if (stats.isFile()) {
          console.log('es un archivo', routes);
          if (path.extname === '.md') {
            console.log(file, 'es ms');
        
          } else {
            console.log('no es md');
          }
        } else {
          let carpetas = []
          console.log('es una carpeta', carpetas);
        }
        // para saber si es md
        


      })
    } else {
      reject('la ruta no existe');
    }
  })

} 

        
  


module.exports = {
  mdLinks
};



