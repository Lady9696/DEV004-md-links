// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const { identificator } = require('./test/data');
//const axios = require('axios');
const { existPath, absolute, checkLink, getAllFilesMd, identificatorMd, readMd, getStats, processEnsayo,itera} = require('./test/data');
//const { error, log } = require('console');
//const { mdLinks } = require ('./cli.js')

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
                  let result = processEnsayo(data, routeAbsolute);

                  // console.log(result,'******');
                  checkLink(result)
                    .then((resol) => {
                      // console.log(resol, 'algo');
                      resolve(resol);
                    })
                    
                  


                }).catch((error) => {
                  console.log(error, 'este es el error');
                })




            } else {
              console.log('no es md');
            }
          } else {
            // aqui esta todos los archivos  en un array
            const directoryFiles = getAllFilesMd(routeAbsolute);
            console.log(directoryFiles, 'esto');
            // itero los archivos 
            let indice = 0;
            //esta es mi funciòn para iterar los archivos y leerlos
           const mdFiles = itera(directoryFiles, routeAbsolute);
           console.log(mdFiles, 'asdfgh');
           //processEnsayo(data, routeAbsolute);
           


          }

        })
      //tabnine

    } else {
      console.log('la ruta no existe');
    }
  })

}





exports.mdLinks = mdLinks;



/*
const ensayo = process.argv[2]
console.log(ensayo);
//console.log(process.argv, 'lalalalallllllllllllll');

if(process.argv.includes('--validate')|| process.argv.includes('-v')){
  mdLinks(result)
 
}
// llmar a mdLinks para que devuelva {´hrf, statu...}
//console.log(`hello world${args}`);
mdLinks('./test/README.md')
.then(( result )=>{
  [{ href, text, file }]

  console.log('resultadoooooooooooooooooooooooooooooooooooooooooooooooooo',href);
})
.catch((error) => {
   console.log(error)

 });
*///console.log(checkLink(result), '+++++++');
                  //console.log('debe funcionar', result); 
                  //console.log( 'extraigo los links', result);
                  // aquì itero los links quee stan en el obejto result


                  // Promise.allSettled(promisesArray)
                  // //console.log(Promise.allSettled(promisesArray))
                  //   .then((respuestas) => {
                  //     // resolve({respuestas}, 'holaaaaaaaaaaa');
                  //     console.log({ respuestas }, 'holaaaaaaaaaaa');
                  //     //console.log(respuestas, 'mklsdmznmcvk');

                  //   })
                  //   .catch((error) => {
                  //     console.error(error);
                  //     //reject({error});

                  //   })


                  //console.log(link.href, link.text, link.file);

                 