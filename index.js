// fs se debe usar para poder realizar las fucniones debemos 'importar' el mòdulo fs
//const { identificator } = require('./test/data');
const axios = require('axios');
const { existPath, absolute, checkLink, getAllFiles, identificatorMd} = require('./test/data');


const { fs, path } = require('./test/data.js');
1// se crea una funciòn que tiene routes y options como paàmetro, lo que me retorna una promesa
//con dos valores   que son resolve y reject.
const mdLinks = (routes, options) => {
  return new Promise((resolve, reject) => {
    let filesindirectorio = [];
    // se verifica si la ruta existe
    if (existPath(routes)) {
      console.log('existe la ruta');
      // si la ruta es relativa, se vuelve absoluta
      const routeAbsolute = absolute(routes);
      console.log(routeAbsolute);
      
      // esta funciòn em eprmite identificar si es un archivo o es un directorio
      fs.stat(routeAbsolute, (err, stats) => {
        if (err) {
          reject(err);
        } else {

        } if (stats.isFile()) {
          console.log('es un archivo', routeAbsolute);
          // Me permite saber si es un archivo md
          if (identificatorMd(routeAbsolute)) {
            console.log(routeAbsolute, 'es md');
            // Para leer archivos md
            // el 'utf8' me permite obtener el string
            fs.readFile(routeAbsolute, 'utf8', (err, data) => {
              if (err) throw err;
              //console.log('esto es el strin', data);
              //console.log(data), 'es la lectura';

              // esta funciòn me permite extaer los links e iterarlos
              function processEnsayo() {
                // aquì saco el patron [texto](links)
                const regexMdLinks = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gm
                const singleMatch = /\[([^\[]+)\]\((.*)\)/
                // aquì le paso el mètodo  para identificar los links que debo extraer
                // me devuelve un array
                const identificator = data.match(regexMdLinks);
                 //console.log('esto es todos los links y textos del string', identificator );
                // aquì creo dos arrays vacios  
                let arrObjFalse = [];
                let links = [];
                // Necesito crear dos objetos validate true y validate false
                // para validate false, creo arrObjFalse
               // 
                for (let i = 1; i < identificator.length; i++) {
                  // para extraer el texto y los links del array 
                  const text = singleMatch.exec(identificator[i]);

                  // como esto me trae otra infromaciòn que no necesito, introduzco lo que necesito en el objeto 
                  // arrObjFalse, que es  href(el link), text (el texto), y el  absolutePath (ruta absoluta) con el mètodo push
                  //console.log('esto es el metodo',text);

                  arrObjFalse.push({
                    href: text[2],
                    text: text[1],
                    file:routeAbsolute,
                    
                  });
                  //esto hace parte del obajeto validate true
                  links.push({ href: text[2], cantidad: i});
                  //console.log(arrObjFalse, 'esto es cuando validate es false');
                }
                // este return me sirve para poder usar los links que voy a validar en otra funciòn
                return {
                  //arrObjFalse: arrObjFalse,
                 links: links
                };

              }
              // para hacer la peticiòn  http a los links
              // primero sew xtraen los links que voy a validar
              //let  ensayo = ["... texto con links ..."];
              // esta variable me devuelve los links como objeto con la propiedad hrf(el link)
              // al asignarsela a la variable result creo un obejto que contiene a links y este tiene la propiedad hrf
              let result = processEnsayo(data);
              console.log('es el data', result);
              //console.log( 'extraigo los links', result);
             // aquì itero los links quee stan en el obejto result
              result.links.forEach(link => {
                // se invoca la funciòn de la promesa
                checkLink(link.href)
                  .catch(error => console.error(error));
              });
              //console.log(result.arrObj, 'este es el vlaidate false'); // Access the arrObj array
              //console.log(result.links, 'este es el intento de valdiate trur'); // Access the links array
              //console.log(arrObj);

            });

          } else {
            console.log('no es md');
          }
        } else {
          // aqui esta todos los archivos con md
          const allFilesMd = getAllFiles(routeAbsolute);
          console.log(allFilesMd);
          /*
          if(identificatorMd(routeAbsolute)){
            filesindirectorio.push(routeAbsolute)
            console.log('es md', filesindirectorio);
          } else {
            console.log('no es md', routeAbsolute);
          }
          */
          
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



