const fs = require("fs");
const path = require("path");
const axios = require('axios');
// Fucniòn para identificar si existe la ruta
const existPath = (file) => {
  return fs.existsSync(file);

};
// Funciòn que identifica si la ruta es relativa o absoluta, y en caso de ser relativa, la vuelve absoluta.
const absolute = (file) => {
  if (!path.isAbsolute(file)) {
    file = path.resolve(file)
  }
  return file
}
// aquì estoy verificando si el link esta disponible o kha
function checkLink(url) {
  return new Promise((resolve, reject) => {
    // aquì utilizo axios
    return axios.get(url)
      // la promesa
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          console.log(`${url} si funciona ${response.status}`);
        } else if (response.status >= 100 && response.status <= 199) {
          console.log(`${url}  respuesta iformativacodigo ${response.status}`);
        } else if(response.status >= 300 && response.status <= 399) { 
          console.log(`${url}  redirecciòn ${response.status}`);
        } else {
          console.log(`${url}  funcion pero no se cual es el response`);
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 &&  error.response.status <= 499) {

          reject(`${url}  no está funcionando ${error.response.status}`);

        } else if (error.response && error.response.status >= 500 &&  error.response.status <= 599) {
          console.log(`${url} no está funcionando  ${error.response.status}`);
        } else {
          console.log(`${url} error what ${error.response}`);
        }

      });
  })
}

//hacer una funciòn para leer direcotrios
const readDirectory= (routes) => {
  
      if (!stats.isFile()) {
        do {
          const filenames = fs.readdirSync(__dirname);
          filenames.forEach((files) => {
            console.log(files, "esta es el archivo del directorio");
          });
        } while (false);
        {
          //se utiliza esto fs.readdirSync() method
          //leerlo como directorio y me va entregra un array con las rutas de los archivos
        }
      } else {
        console.log("es un archivo");
      }
    }
 

/*
// Funciòn para identifar archivos md
const identificatorMd = (file) => {
  if (path.extname(file) === '.md') {
    console.log(file);

  }
}

*/
// const markdownLinkExtractor = require('markdown-link-extractor');

// funciòn para leer los archivos, debe ser una promesa





//

*/
module.exports = {
  //identificator, 
  existPath, absolute, checkLink,
};
module.exports.fs = require("fs");
module.exports.path = require("path");




