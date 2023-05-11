// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const { identificator } = require('./test/data');
const { existPath, absolute } = require('./test/data');

const { fs, path } = require('./test/data.js');
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

      fs.stat(routeAbsolute, (err, stats) => {
        if (err) {
          reject(err);
        } else {

        } if (stats.isFile()) {
          console.log('es un archivo', routeAbsolute);
          if (path.extname(routeAbsolute) === '.md') {
            console.log(routeAbsolute, 'es md');
            fs.readFile(routeAbsolute, 'utf8', (err, data) => {
              if (err) throw err;
              //console.log(data), 'es la lectura';
              
              const regexMdLinks = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gm
              //extraer de la data [texto](links)
              const ensayo = data.match(regexMdLinks);
              //console.log(ensayo);
              //const matches = mdContents.match(regexMdLinks)
              //console.log('links', ensayo)
              const arrObj = []
              const singleMatch = /\[([^\[]+)\]\((.*)\)/
              for (var i = 0; i < ensayo.length; i++) {
                var text = singleMatch.exec(ensayo[i])
                
                console.log(`Word  #${i}: ${text[1]}`)
                console.log(`Link  #${i}: ${text[2]}`)
                arrObj.push({
                  href: text[2],
                  text: text[1],
                  
                })
              }
              console.log(arrObj);
              
            });

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



