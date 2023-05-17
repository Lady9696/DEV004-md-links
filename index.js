// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const { identificator } = require('./test/data');
const axios = require('axios');
const { existPath, absolute, checkLink, getAllFilesMd, identificatorMd, readMd, getStats, processEnsayo } = require('./test/data');


//const { fs, path } = require('./test/data.js');
1// se crea una funciòn que tiene routes y options como paàmetro, lo que me retorna una promesa
//con dos valores   que son resolve y reject.
const mdLinks = (routes, options) => {
  return new Promise((resolve, reject) => {
    //let filesindirectorio = [];
    // se verifica si la ruta existe
    if (existPath(routes)) {
      console.log('existe la ruta');
      // si la ruta es relativa, se vuelve absoluta
      const routeAbsolute = absolute(routes);
      console.log(routeAbsolute);

      // esta funciòn em eprmite identificar si es un archivo o es un directorio
      getStats(routeAbsolute)
        .then((stats) => {
          if (stats.isFile()) {
            console.log('es un archivo', routeAbsolute);
            // Me permite saber si es un archivo md
            if (identificatorMd(routeAbsolute)) {
              console.log(routeAbsolute, 'es md');
              // Para leer archivos md
              // el 'utf8' me permite obtener el string
              readMd(routeAbsolute)
                .then((data) => {
                  // esta funciòn me permite extaer los links e iterarlos
                  let result = processEnsayo(data);
                  console.log('es el data', result);
                  //console.log( 'extraigo los links', result);
                  // aquì itero los links quee stan en el obejto result
                  result.links.forEach(link => {
                    // se invoca la funciòn de la promesa
                    checkLink(link.href, link.cantidad)
                      .catch(error => console.error(error))
                      .then((res) => console.log(res));
                  });

                })


            } else {
              console.log('no es md');
            }
          } else {
            // aqui esta todos los archivos  en un array
            const directoryFiles = getAllFilesMd(routeAbsolute);
            // console.log(directoryFiles, 'esto');
            // itero los archivos 
            directoryFiles.forEach((directoryFile) => {
              if (identificatorMd(directoryFile)) {
                // El archivo es un archivo Markdown (.md)
                // Realiza las acciones que necesites con el archivo
                console.log(directoryFile, 'es markdow');
                //console.log(mdfile, 'cada uno de los archivos');
                readMd(directoryFile)
                  .then((data) => {
                                        
                    let result2 = processEnsayo(data, routeAbsolute);
                    console.log('data de carpetas');
                    result2.links.forEach((link) => {
                      checkLink(link.href, link.cantidad)
                        .catch((err) => console.err(err))
                        .then((reso) => console.log(reso));
    
                    })
                   
                  })
                 

              }

            })


          }

        })
      //tabnine

    } else {
      reject('la ruta no existe');
    }
  })

}





module.exports = {
  mdLinks
};



