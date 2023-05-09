const fs = require("fs");
const path = require("path");
const { access, constants } = require('fs');
const file = 'package.json';

const existPath = (file) => {
  (fs.existsSync(file))
  return existPath
};



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
  existPath,
};
module.exports.fs = require("fs");
module.exports.path = require("path");
module.exports.access = require("node:fs");
module.exports.constants = require("node:fs");


