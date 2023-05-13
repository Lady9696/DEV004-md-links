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
          console.log(`${url} si funciona ${response.status}` );
        } else if(response.status>= 100 && response.status <= 199){
          console.log(`${url}  respuesta iformativacodigo ${response.status}`);
        }
      })
      .catch(error => {
        
          reject(`${url}  no está funcionando ${error.message}`);
        
        
        
      });
  })
}
// Funciòn para identifar archivos md
const identificatorMd = (file) => {
  if (path.extname === '.md') {
    console.log(file);

  }
}


// const markdownLinkExtractor = require('markdown-link-extractor');

// funciòn para leer los archivos, debe ser una promesa





//
/*
//hacer una funciòn para leer direcotrios
const identificator = (routes) => {
  //para identificar si es un directorio
  fs.stat(routes, (err, stats) => {
    if (err) {
      reject(err); // TODO: reject no existe en este contexto
    } else {
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
  });
};
*/
module.exports = {
  //identificator, 
  existPath, absolute, checkLink,
};
module.exports.fs = require("fs");
module.exports.path = require("path");




